import { lines, fetchPathsTaggedWith, fetchFile, getToken } from "../src/tags"

// Allow more time for long-running integration tests
jest.setTimeout(10000)

// Test against the nudge repo itself using the default tag
const repo = "zioroboco/nudge"
const tag = "nudge"

// A file known to be tagged with the default tag
const taggedFilePath = "tests/tagged-file.md"

describe("fetching tagged filepaths", () => {
  it("returns the path of the test tagged file", async () => {
    const token = await getToken()
    const taggedPaths = await fetchPathsTaggedWith(tag, repo, token)
    expect(taggedPaths).toContain(taggedFilePath)
  })
})

describe("fetching the test tagged file by path", () => {
  it("returns a response with the path of the tagged file", async () => {
    const token = await getToken()
    const response = await fetchFile(repo, taggedFilePath, token)
    expect(response.path).toBe(taggedFilePath)
  })

  it("has a first line matching the test tagged file", async () => {
    const token = await getToken()
    const response = await fetchFile(repo, taggedFilePath, token)
    const firstLine = lines(response)[0]
    expect(firstLine).toBe("# Title")
  })
})

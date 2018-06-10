import { fetchPathsTaggedWith, fetchFile } from "../src/tags"

// Allow more time for long-running integration tests
jest.setTimeout(10000)

// Test against the nudge repo itself using the default tag
const repo = "zioroboco/nudge"
const tag = "nudge"

// A file known to be tagged with the default tag
const taggedFilePath = "tests/tagged-file.md"

describe("fetching tagged filepaths", () => {
  it("returns the path of the test tagged file", async () => {
    const taggedPaths = await fetchPathsTaggedWith(tag, repo)
    expect(taggedPaths).toContain(taggedFilePath)
  })
})

describe("fetching the test tagged file by path", () => {
  it("returns a response with the path of the tagged file", async () => {
    const response = await fetchFile(repo, taggedFilePath)
    expect(response.path).toBe(taggedFilePath)
  })
})

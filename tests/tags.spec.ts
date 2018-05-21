import { fetchPathsTaggedWith } from "../src/tags"

// Test against the nudge repo itself using the default tag
const repo = "zioroboco/nudge"
const tag = "nudge"

// A file known to be tagged with the default tag
const taggedFilePath = "tests/tagged-file.md"

describe("fetching tagged filepaths", () => {
  it("returns the test tagged file", async () => {
    const taggedPaths = await fetchPathsTaggedWith(tag, repo)
    expect(taggedPaths).toContain(taggedFilePath)
  })
})

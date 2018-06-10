import { default as fetch, RequestInit } from "node-fetch"
import { getSecret } from "./secrets"
import { GitHubFile } from "./types"

const REPO = process.env.REPO!
const TAG = process.env.TAG!

const baseUrl = "https://api.github.com"

/** Assert that a GitHub API token was retrieved from SSM, returning it. */
const getToken = async (): Promise<string> => {
  const tokenParameterName = "GITHUB_TOKEN"
  const token = await getSecret(tokenParameterName)
  if (!token) {
    throw new Error(`${tokenParameterName} not set in SSM parameters`)
  }
  return token
}

/** Create a node-fetch initialisation object with the passed GitHub token. */
const initWithToken = (token: string): RequestInit => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    ContentType: "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "application/vnd.github.v3+json",
    Host: "api.github.com"
  },
  body: undefined
})

/** The relevant structure of the GitHub API query result. */
interface QueryResult {
  items: [{ path: string }]
}

/** Query the GitHub API, returning the paths of all tagged markdown files. */
const fetchPathsTaggedWith = async (tag: string, repo: string) => {
  const query = `q=[${tag}]+repo:${repo}+in:file+language:markdown`
  const token = await getToken()
  const result = await fetch(
    `${baseUrl}/search/code?${query}`,
    initWithToken(token)
  ).then(body => body.json<QueryResult>())
  const taggedFilePaths = result.items.map(item => item.path)
  return taggedFilePaths
}

const fetchFile = async (repo: string, path: string): Promise<GitHubFile> => {
  const token = await getToken()
  const result = await fetch(
    `${baseUrl}/repos/${repo}/contents/${path}`,
    initWithToken(token)
  ).then(body => body.json())
  return result
}

export { fetchPathsTaggedWith, fetchFile }

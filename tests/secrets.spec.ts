import { getSecret } from "../src/secrets"

// Allow more time for long-running integration tests
jest.setTimeout(10000)

// The AWS region of the testing environment
const region = process.env.AWS_DEFAULT_REGION!

it("gets the test secret", async () => {
  // Test secret set as an encrypted SSM parameter in advance
  const secret = { name: "TEST_SECRET", value: "ding" }
  const result = await getSecret(secret.name, region)
  expect(result).toBe(secret.value)
})

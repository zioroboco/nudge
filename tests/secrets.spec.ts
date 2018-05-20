import { getSecret } from "../src/secrets"

it("gets the test secret", async () => {
  process.env.AWS_DEFAULT_REGION = "us-east-1"
  const secret = await getSecret("TEST_SECRET")
  expect(secret).toBe("ding")
})

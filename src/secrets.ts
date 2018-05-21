import { SSM } from "aws-sdk"

const { REGION, AWS_DEFAULT_REGION } = process.env

/**
 * Retrieve a key at runtime from an encrypted SSM parameter.
 * @param name The name of (or path to) the SSM parameter.
 * @param region The region in which the SSM parameter is set.
 */
const getSecret = (
  name: string,
  region = REGION || AWS_DEFAULT_REGION!
): Promise<string | void> =>
  new SSM({ region })
    .getParameter({ Name: name, WithDecryption: true })
    .promise()
    .then(result => {
      if (result.Parameter) {
        return result.Parameter.Value
      }
    })

export { getSecret }

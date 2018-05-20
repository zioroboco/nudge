import { SSM } from "aws-sdk"

const getSecret = (name: string): Promise<string | void> =>
  new SSM({ region: process.env.AWS_DEFAULT_REGION })
    .getParameter({ Name: name, WithDecryption: true })
    .promise()
    .then(result => {
      if (result.Parameter) {
        return result.Parameter.Value
      } else {
        throw new Error(`${name} not defined in SSM parameters`)
      }
    })

export { getSecret }

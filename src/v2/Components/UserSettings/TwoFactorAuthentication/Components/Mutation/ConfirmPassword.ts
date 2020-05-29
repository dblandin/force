import {
  ConfirmPasswordInput,
  ConfirmPasswordMutation,
  ConfirmPasswordMutationResponse,
} from "v2/__generated__/ConfirmPasswordMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const ConfirmPassword = (
  environment: Environment,
  input: ConfirmPasswordInput
) => {
  return new Promise<ConfirmPasswordMutationResponse>(
    async (resolve, reject) => {
      commitMutation<ConfirmPasswordMutation>(environment, {
        onCompleted: (data) => resolve(data),
        onError: (error) => reject(error),
        mutation: graphql`
          mutation ConfirmPasswordMutation($input: ConfirmPasswordInput!)
            @raw_response_type {
            confirmPassword(input: $input) {
              valid
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}

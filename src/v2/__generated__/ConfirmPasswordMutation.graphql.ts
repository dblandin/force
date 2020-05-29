/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type ConfirmPasswordInput = {
    readonly clientMutationId?: string | null;
    readonly password: string;
};
export type ConfirmPasswordMutationVariables = {
    input: ConfirmPasswordInput;
};
export type ConfirmPasswordMutationResponse = {
    readonly confirmPassword: {
        readonly valid: boolean;
    } | null;
};
export type ConfirmPasswordMutationRawResponse = {
    readonly confirmPassword: ({
        readonly valid: boolean;
    }) | null;
};
export type ConfirmPasswordMutation = {
    readonly response: ConfirmPasswordMutationResponse;
    readonly variables: ConfirmPasswordMutationVariables;
    readonly rawResponse: ConfirmPasswordMutationRawResponse;
};



/*
mutation ConfirmPasswordMutation(
  $input: ConfirmPasswordInput!
) {
  confirmPassword(input: $input) {
    valid
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ConfirmPasswordInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "confirmPassword",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ConfirmPasswordPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "valid",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ConfirmPasswordMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ConfirmPasswordMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ConfirmPasswordMutation",
    "id": null,
    "text": "mutation ConfirmPasswordMutation(\n  $input: ConfirmPasswordInput!\n) {\n  confirmPassword(input: $input) {\n    valid\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '46d7950299cac02f7f6c0044677b485d';
export default node;

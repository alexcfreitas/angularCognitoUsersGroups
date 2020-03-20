Source for the Angular Cognito Test

Youtube for this showing how it runs.

https://youtu.be/ROwjNYlxMAs



    "CognitoIdentityPoolAuthAdminRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "ForAnyValue:StringLike": {
                  "cognito-identity.amazonaws.com:amr": "authenticated"
                }
              }
            }
          ]
        }
      }
    },
    "CognitoIdentityPoolAuthAdminPolicy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "CognitoIdentityPoolAuthAdminPolicy",
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": "execute-api:Invoke",
              "Effect": "Allow",
              "Resource": [
                {
                  "Fn::Join": [ "",
                    [ "arn:aws:execute-api:",
                      { "Ref" : "AWS::Region" }, ":",
                      { "Ref" : "AWS::AccountId" }, ":",
                      { "Ref" : "ApiGatewayRestApi" },
                      "/*/*/*"
                    ]
                  ]
                }
              ]
            },
            {
              "Action": [
                "s3:*"
              ],
              "Effect": "Allow",
              "Resource": {
                "Fn::Join": [ "",
                  [ "arn:aws:s3:::",
                    { "Ref": "UserDataBucket" },
                    "/*"
                  ]
                ]
              }
            }
          ]
        },
        "Roles": [
          {
            "Ref": "CognitoIdentityPoolAuthAdminRole"
          }
        ]
      }
    },
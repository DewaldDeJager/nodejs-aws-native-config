# AWS-native configuration for Node.js applications

### Initial Setup

EC2 instance profile/IAM role permissions

### AWS Secrets Manager

- [ ] Credentials for RDS database
- [ ] Credentials for other database
- [ ] Key-value pairs
- [ ] Plaintext

Create the client:

```javascript
const { SecretsManagerClient } = require('@aws-sdk/client-secrets-manager')
const REGION = 'eu-west-1'
const secretsManagerClient = new SecretsManagerClient({ region: REGION })
```

Get credentials for an RDS database:

```javascript
secretsManagerClient.send(new GetSecretValueCommand({
  SecretId: 'demo-api/dev/rds-database'
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "57037469-64bd-4a3f-9531-b203083d6647",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "ARN": "arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/rds-database-sqnkUS",
  "CreatedDate": "2021-10-14T10:10:39.507Z",
  "Name": "demo-api/dev/rds-database",
  "SecretString": "{\"username\":\"demo-api\",\"password\":\"!MbSNBKJ$HB67hjhgb&2mjke\",\"engine\":\"mysql\",\"host\":\"test.something.eu-west-1.rds.amazonaws.com\",\"port\":3306,\"dbInstanceIdentifier\":\"demo\"}",
  "VersionId": "ade7e068-6dae-4de1-a48d-792d93a4379e",
  "VersionStages": [
    "AWSCURRENT"
  ]
}
```

Get credentials for another database:

```javascript
secretsManagerClient.send(new GetSecretValueCommand({
  SecretId: 'demo-api/dev/mysql-database'
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "e90f26c7-328b-4c1e-b911-ed44d985caab",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "ARN": "arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/mysql-database-FwUqIY",
  "CreatedDate": "2021-10-14T10:21:25.536Z",
  "Name": "demo-api/dev/mysql-database",
  "SecretString": "{\"username\":\"demo-api\",\"password\":\"!MbSNBKJ$HB67hjhgb&2mjke\",\"engine\":\"mysql\",\"host\":\"test.something.eu-west-1.rds.amazonaws.com\",\"port\":\"3306\",\"dbname\":\"demo_transactions\"}",
  "VersionId": "6fc015f8-7b8d-4eaa-a327-c0e8de941740",
  "VersionStages": [
    "AWSCURRENT"
  ]
}
```

Get credentials for key-value pairs:

```javascript
secretsManagerClient.send(new GetSecretValueCommand({
  SecretId: 'demo-api/dev/key-value-pairs'
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "eca4f71a-f77c-4bb9-bb92-e2d4c5a16e76",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "ARN": "arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/key-value-pairs-GfqLoi",
  "CreatedDate": "2021-10-14T10:18:47.297Z",
  "Name": "demo-api/dev/key-value-pairs",
  "SecretString": "{\"foo\":\"bar\",\"derp\":\"69\"}",
  "VersionId": "6acf7301-d9fe-4fbf-9c59-9c7c5f96aba2",
  "VersionStages": [
    "AWSCURRENT"
  ]
}
```

Get credentials for plaintext:

```javascript
secretsManagerClient.send(new GetSecretValueCommand({
  SecretId: 'demo-api/dev/plaintext'
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "fc6c79d6-5dde-4c20-b1e9-22d92e5d32dc",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "ARN": "arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/plaintext-m3U2Ba",
  "CreatedDate": "2021-10-14T10:20:10.882Z",
  "Name": "demo-api/dev/plaintext",
  "SecretString": "-----BEGIN OPENSSH PRIVATE KEY-----\nUkVBRFJ...JUFBFUg==\n-----END OPENSSH PRIVATE KEY-----",
  "VersionId": "ed159653-ab0b-4e2f-af31-fed5a9c234c6",
  "VersionStages": [
    "AWSCURRENT"
  ]
}
```

### AWS Systems Manager Parameter Store

- [ ] String
- [ ] StringList
- [ ] SecureString
- [ ] Multiple parameters at once
- [ ] Secrets Manager reference to key-value pairs
- [ ] Secrets Manager reference to plaintext

Create the client:

```javascript
const { SSMClient, GetParameterCommand, GetParametersCommand } = require('@aws-sdk/client-ssm')
const REGION = 'eu-west-1'
const ssmClient = new SSMClient({ region: REGION })
```

Get a string:

```javascript
ssmClient.send(new GetParameterCommand({
  Name: `/demo-api/dev/string`
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "8239faac-f963-4a9c-9eb6-969e2db4796b",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Parameter": {
    "ARN": "arn:aws:ssm:eu-west-1:XXXXXXXXXXXX:parameter/demo-api/dev/string",
    "DataType": "text",
    "LastModifiedDate": "2021-10-14T10:26:23.454Z",
    "Name": "/demo-api/dev/string",
    "Type": "String",
    "Value": "Hello world!",
    "Version": 1
  }
}
```

Get a string list:

```javascript
ssmClient.send(new GetParameterCommand({
  Name: `/demo-api/dev/string-list`
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "6d300b72-1526-4b68-848c-347423b1df55",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Parameter": {
    "ARN": "arn:aws:ssm:eu-west-1:XXXXXXXXXXXX:parameter/demo-api/dev/string-list",
    "DataType": "text",
    "LastModifiedDate": "2021-10-14T10:27:07.190Z",
    "Name": "/demo-api/dev/string-list",
    "Type": "StringList",
    "Value": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
    "Version": 1
  }
}
```

Get a secure string:

```javascript
ssmClient.send(new GetParameterCommand({
  Name: `/demo-api/dev/secure-string`,
  WithDecryption: true
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "34218dd2-e6ac-4cb8-988b-ffb29349e1c4",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Parameter": {
    "ARN": "arn:aws:ssm:eu-west-1:XXXXXXXXXXXX:parameter/demo-api/dev/secure-string",
    "DataType": "text",
    "LastModifiedDate": "2021-10-14T10:28:06.159Z",
    "Name": "/demo-api/dev/secure-string",
    "Type": "SecureString",
    "Value": "Everyone has secrets",
    "Version": 1
  }
}
```

Getting multiple parameters with one call:

```javascript
ssmClient.send(new GetParametersCommand({
  Names: [
    '/demo-api/string',
    '/demo-api/string-list',
    '/demo-api/secure-string'
  ],
  WithDecryption: true
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "1a23c4fc-72b9-4e4e-ad86-cb9e704b2fa6",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "InvalidParameters": [],
  "Parameters": [
    {
      "ARN": "arn:aws:ssm:eu-west-1:XXXXXXXXXXXX:parameter/demo-api/dev/secure-string",
      "DataType": "text",
      "LastModifiedDate": "2021-10-14T10:28:06.159Z",
      "Name": "/demo-api/dev/secure-string",
      "Type": "SecureString",
      "Value": "Everyone has secrets",
      "Version": 1
    },
    {
      "ARN": "arn:aws:ssm:eu-west-1:XXXXXXXXXXXX:parameter/demo-api/dev/string",
      "DataType": "text",
      "LastModifiedDate": "2021-10-14T10:26:23.454Z",
      "Name": "/demo-api/dev/string",
      "Type": "String",
      "Value": "Hello world!",
      "Version": 1
    },
    {
      "ARN": "arn:aws:ssm:eu-west-1:XXXXXXXXXXXX:parameter/demo-api/dev/string-list",
      "DataType": "text",
      "LastModifiedDate": "2021-10-14T10:27:07.190Z",
      "Name": "/demo-api/dev/string-list",
      "Type": "StringList",
      "Value": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
      "Version": 1
    }
  ]
}
```

Getting key-value pair secret from Secrets Manager using Parameter Store:

```javascript


ssmClient.send(new GetParameterCommand({
  Name: `/aws/reference/secretsmanager/demo-api/dev/key-value-pairs`,
  WithDecryption: true
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "ebc51442-18e6-4e41-abc6-6c26b0f5ea29",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Parameter": {
    "ARN": "arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/key-value-pairs-GfqLoi",
    "LastModifiedDate": "2021-10-14T10:18:47.297Z",
    "Name": "/aws/reference/secretsmanager/demo-api/dev/key-value-pairs",
    "SourceResult": "{\"ARN\":\"arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/key-value-pairs-GfqLoi\",\"name\":\"demo-api/dev/key-value-pairs\",\"versionId\":\"6acf7301-d9fe-4fbf-9c59-9c7c5f96aba2\",\"secretString\":\"{\\\"foo\\\":\\\"bar\\\",\\\"derp\\\":\\\"69\\\"}\",\"versionStages\":[\"AWSCURRENT\"],\"createdDate\":\"Oct 14, 2021, 10:18:47 AM\"}",
    "Type": "SecureString",
    "Value": "{\"foo\":\"bar\",\"derp\":\"69\"}",
    "Version": 0
  }
}
```

Getting plaintext secret from Secrets Manager using Parameter Store:

```javascript
ssmClient.send(new GetParameterCommand({
  Name: `/aws/reference/secretsmanager/demo-api/dev/plaintext`,
  WithDecryption: true
}))
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "4d207051-8af5-4eda-aa35-e70b9f7fb630",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Parameter": {
    "ARN": "arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/plaintext-m3U2Ba",
    "LastModifiedDate": "2021-10-14T10:20:10.882Z",
    "Name": "/aws/reference/secretsmanager/demo-api/dev/plaintext",
    "SourceResult": "{\"ARN\":\"arn:aws:secretsmanager:eu-west-1:XXXXXXXXXXXX:secret:demo-api/dev/plaintext-m3U2Ba\",\"name\":\"demo-api/dev/plaintext\",\"versionId\":\"ed159653-ab0b-4e2f-af31-fed5a9c234c6\",\"secretString\":\"-----BEGIN OPENSSH PRIVATE KEY-----\\nUkVBRFJ...JUFBFUg==\\n-----END OPENSSH PRIVATE KEY-----\",\"versionStages\":[\"AWSCURRENT\"],\"createdDate\":\"Oct 14, 2021, 10:20:10 AM\"}",
    "Type": "SecureString",
    "Value": "-----BEGIN OPENSSH PRIVATE KEY-----\nUkVBRFJ...JUFBFUg==\n-----END OPENSSH PRIVATE KEY-----",
    "Version": 0
  }
}
```

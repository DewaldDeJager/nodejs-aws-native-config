const { SSMClient, GetParameterCommand, GetParametersCommand } = require('@aws-sdk/client-ssm')
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')
const REGION = 'eu-west-1'
const NAMESPACE = 'demo-api'
const ENVIRONMENT = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

const secretsManagerClient = new SecretsManagerClient({ region: REGION })
const ssmClient = new SSMClient({ region: REGION })

function testGetParameter () {
  async function getParameter (name) {
    return await ssmClient.send(new GetParameterCommand({
      Name: `/${NAMESPACE}/${ENVIRONMENT}/${name}`,
      WithDecryption: true
    }))
  }

  getParameter('string').then(value => {
    console.log(`String: ${JSON.stringify(value)}`)
  })
  getParameter('string-list').then(value => {
    console.log(`StringList: ${JSON.stringify(value)}`)
  })
  getParameter('secure-string').then(value => {
    console.log(`SecureString: ${JSON.stringify(value)}`)
  })
}

function testGetParameters () {
  async function getParameters (names) {
    return await ssmClient.send(new GetParametersCommand({
      Names: names.map(name => `/${NAMESPACE}/${ENVIRONMENT}/${name}`),
      WithDecryption: true
    }))
  }

  getParameters(['string', 'string-list', 'secure-string']).then(function (response) {
    console.log(JSON.stringify(response))
  })
}

function testGetSecret () {
  async function getSecret (name) {
    return await secretsManagerClient.send(new GetSecretValueCommand({
      SecretId: `${NAMESPACE}/${ENVIRONMENT}/${name}`
    }))
  }

  getSecret('rds-database').then(value => {
    console.log(`RDS: ${JSON.stringify(value)}`)
  })

  getSecret('mysql-database').then(value => {
    console.log(`MySQL: ${JSON.stringify(value)}`)
  })

  getSecret('key-value-pairs').then(value => {
    console.log(`Key-value pairs: ${JSON.stringify(value)}`)
  })

  getSecret('plaintext').then(value => {
    console.log(`Plaintext: ${JSON.stringify(value)}`)
  })
}

function testGetSecretAsParameter () {
  async function getParameter (name) {
    return await ssmClient.send(new GetParameterCommand({
      Name: `/aws/reference/secretsmanager/${NAMESPACE}/${ENVIRONMENT}/${name}`,
      WithDecryption: true
    }))
  }

  getParameter('key-value-pairs').then(value => {
    console.log(`Key-value pairs: ${JSON.stringify(value)}`)
  })
  getParameter('plaintext').then(value => {
    console.log(`Plaintext: ${JSON.stringify(value)}`)
  })
}

testGetParameter()
testGetParameters()
testGetSecret()
testGetSecretAsParameter()

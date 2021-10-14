const { SSMClient, GetParameterCommand, GetParametersCommand } = require('@aws-sdk/client-ssm')

const client = new SSMClient({ region: 'eu-west-1' })

function testGetParameter () {
  async function getParameter (name) {
    return await client.send(new GetParameterCommand({
      Name: name,
      WithDecryption: true
    }))
  }

  getParameter('/demo-api/dev/db-host').then(value => {
    console.log(`DB Host: ${value.Parameter.Value}`)
  })
  getParameter('/demo-api/dev/db-port').then(value => {
    console.log(`DB Port: ${value.Parameter.Value}`)
  })
  getParameter('/demo-api/dev/db-username').then(value => {
    console.log(`DB Username: ${value.Parameter.Value}`)
  })
  getParameter('/demo-api/dev/db-password').then(value => {
    console.log(`DB Password: ${value.Parameter.Value}`)
  })
}

function testGetParameters () {
  async function getParameters (names) {
    return await client.send(new GetParametersCommand({
      Names: names.map(name => `/demo-api/dev/${name}`),
      WithDecryption: true
    }))
  }

  getParameters(['db-host', 'db-port', 'db-username', 'db-password']).then(function (response) {
    console.log(JSON.stringify(response.Parameters.map(parameter => parameter.Value)))
  })
}

testGetParameter()
testGetParameters()

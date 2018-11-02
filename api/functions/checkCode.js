const { Client } = require('authy-client')
const AWS = require('aws-sdk')

function verifyPhone ({ phone, countryCode, token }) {
  const authy = new Client({ key: process.env.AUTHY_KEY })
  return authy.verifyPhone({ countryCode, phone, token })
}

function save ({ countryCode, phone }) {
  const params = {
    TableName: process.env.PHONE_NUMBERS_TABLE_NAME,
    Item: {
      id: countryCode + phone,
      phone,
      countryCode
    }
  }
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb.put(params).promise()
}

module.exports.checkCode = async (event, context) => {
  try {
    const { phone, countryCode, token } = JSON.parse(event.body)
    await verifyPhone({ phone, countryCode, token })
    await save({ phone, countryCode })
    return {
      statusCode: 201,
      body: '',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (error) {
    console.error('error', error)
    if (error.name === 'ValidationFailedError') {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        statusCode: 400,
        body: ''
      }
    }
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 500,
      body: ''
    }
  }
}

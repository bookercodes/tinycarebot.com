const { Client } = require('authy-client')
const authy = new Client({ key: process.env.AUTHY_KEY })
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.checkCode = async (event, context) => {
  try {
    const { phone, countryCode, token } = JSON.parse(event.body)
    await authy.verifyPhone({ countryCode, phone, token })
    const params = {
      TableName: process.env.PHONE_NUMBERS_TABLE_NAME,
      Item: {
        id: countryCode + phone,
        phone,
        countryCode
      }
    }
    await dynamoDb.put(params).promise()
    return {
      statusCode: 201,
      body: '',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (error) {
    console.error('error', error)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 500,
      body: ''
    }
  }
}

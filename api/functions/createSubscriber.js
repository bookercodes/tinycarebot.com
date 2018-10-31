const { Client } = require('authy-client')
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const authy = new Client({ key: process.env.AUTHY_KEY })

module.exports.createSubscriber = async (event, context) => {
  try {
    const { phone, countryCode } = JSON.parse(event.body)
    const item = await dynamoDb
      .get({
        TableName: process.env.PHONE_NUMBERS_TABLE_NAME,
        Key: {
          id: countryCode + phone
        }
      })
      .promise()
    if (Object.keys(item).length > 0) {
      return {
        statusCode: 409,
        body: '',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
    await authy.startPhoneVerification({ countryCode, phone, via: 'sms' })
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (error) {
    console.log('error', error)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 500,
      body: ''
    }
  }
}

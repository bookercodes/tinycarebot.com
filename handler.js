const { Client } = require('authy-client')
const authy = new Client({ key: process.env.KEY })
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

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
        headers: {}
      }
    }
    await authy.startPhoneVerification({ countryCode, phone, via: 'sms' })
    return {
      statusCode: 200,
      headers: {}
    }
  } catch (error) {
    console.log('error', error)
    return {
      headers: {},
      statusCode: 500,
      body: ''
    }
  }
}

module.exports.checkCode = async (event, context, done) => {
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
      headers: {}
    }
  } catch (error) {
    console.error('error', error)
    return {
      headers: {},
      statusCode: 500
    }
  }
}

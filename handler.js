const { Client } = require('authy-client')
const authy = new Client({ key: process.env.AUTHY_KEY })
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

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
      headers: {}
    }
  } catch (error) {
    console.error('error', error)
    return {
      headers: {},
      statusCode: 500,
      body: ''
    }
  }
}

module.exports.sendSms = async (event, context) => {
  try {
    const data = await dynamoDb.scan({
      TableName: process.env.PHONE_NUMBERS_TABLE_NAME
    }).promise()
    const numbers = data.Items.map(item => `+${item.countryCode} ${item.phone}`)
    const promises = numbers.map(number => twilio.messages.create({
      to: number,
      from: process.env.TWILIO_MESSAGING_SERVICE_SID,
      body: 'this is a test message. more to come'
    }))
    await Promise.all(promises)
    return {
      headers: {},
      statusCode: 200,
      body: 'success i guess'
    }
  } catch (error) {
    console.error('error', error)
    return {
      headers: {},
      statusCode: 500,
      body: ''
    }
  }
}

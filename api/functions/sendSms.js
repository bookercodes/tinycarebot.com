const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const { sample } = require('lodash')

module.exports.sendSms = async (event, context) => {
  try {
    const data = await dynamoDb
      .scan({
        TableName: process.env.PHONE_NUMBERS_TABLE_NAME
      })
      .promise()
    const numbers = data.Items.map(item => `+${item.countryCode} ${item.phone}`)
    const messages = [
      '🍜: remember to take a moment to eat something if you have been forgetting to eat please',
      '🙌🏼: please take time to wiggle your fingers and to',
      '🌳: dont forget to rest your eyes please',
      '🎵: please dont forget to take a bit of time to play some music that helps you feel peaceful',
      '🚰: please remember to take a second to go get a sip of water',
      '💚: text back your friends please',
      '💟: please dont forget to say hi to a friend'
    ]
    const body = sample(messages)
    const promises = numbers.map(number =>
      twilio.messages.create({
        to: number,
        from: process.env.TWILIO_MESSAGING_SERVICE_SID,
        body
      })
    )
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

/** @jsx jsx */

import { Component } from 'react'
import { injectGlobal } from 'emotion'
import { jsx } from '@emotion/core'
import PhoneNumberForm from './PhoneNumberForm'
import CodeForm from './CodeForm'
import 'react-phone-number-input/style.css'
import { post } from 'axios'
import Alert from './Alert'

injectGlobal`
  body {
    background: #ededed;
    margin: 0;
    font-family: 'Open Sans';
    line-height: 1.8em;
  }

  .react-phone-number-input__input {
    border-bottom: none;
  }
`

class ReasonsList extends Component {
  render() {
    return (
      <ul
        css={{
          listStyle: 'none',
          paddingLeft: 0,
          display: 'flex',
          marginBottom: 60
        }}
      >
        <li
          css={{
            flex: 1,
            padding: 10
          }}
        >
          <div>
            <span
              css={{
                fontFamily: 'Indie Flower',
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
                src="/respect.svg"
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Break the twitch
            </span>
          </div>
          <p>
            When you get a notification, is your knee-jerk reaction to reach for
            your phone? If so, it might be healthy to disconnect more often.
            Tiny Care Bot reminds you how.
          </p>
        </li>
        <li
          css={{
            flex: 1,
            padding: 10
          }}
        >
          <div>
            <span
              css={{
                fontFamily: 'Indie Flower',
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
                src="/smile.svg"
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Stay connected
            </span>
          </div>
          <p>
            There has never been more ways to connect online and yet,{' '}
            <a
              href="https://www.bbc.co.uk/bbcthree/article/5a5db873-bc83-4159-9006-57a4d689f902"
              css={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 600,
                color: '#728860'
              }}
            >
              research suggests our generation is the loneliness
            </a>
            . This tiny bot reminds you to engage with your friends in
            meaningful ways.
          </p>
        </li>
        <li
          css={{
            flex: 1,
            padding: 10
          }}
        >
          <div>
            <span
              css={{
                fontFamily: 'Indie Flower',
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
                src="/friendly.svg"
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Love your body
            </span>
          </div>
          <p>
            Please, please take the time to eat nutritious food, check your
            posture often, and stretch.{' '}
          </p>
        </li>
      </ul>
    )
  }
}

class App extends Component {
  state = {
    alertText: '',

    phone: '',
    loading: false,
    submitted: false,
    countryCode: ''
  }

  onPhoneNumberSubmitted = async ({ phone, countryCode }) => {
    try {
      this.setState({ loading: true, alertText: '' })
      await post(
        'https://aphlvvdrjk.execute-api.eu-west-2.amazonaws.com/dev/subscribers',
        {
          countryCode,
          phone
        }
      )
      this.setState({
        phone,
        countryCode
      })
      this.onSuccess(
        `A confirmation code has been sent to ${phone}. Please check and enter the code here.`
      )
    } catch (error) {
      const { response } = error
      if (response.status === 409) {
        this.onError(
          `Whops. The number +${countryCode}${phone} is already in our database. There's no need to submit it again.`
        )
        return
      }
      console.error('error', error.response)
    } finally {
      this.setState({ loading: false })
    }
  }

  onError = alertText => {
    this.setState({
      alertColor: '#F6AFB2',
      alertText
    })
  }

  onSuccess = alertText => {
    this.setState({
      alertText,
      alertColor: '#d5f0ff'
    })
  }

  onCodeSubmitted = async ({ code }) => {
    try {
      this.setState({ loading: true })
      await post(
        'https://aphlvvdrjk.execute-api.eu-west-2.amazonaws.com/dev/code',
        {
          countryCode: this.state.countryCode,
          phone: this.state.phone,
          token: code
        }
      )
      this.setState({
        submitted: true
      })
      this.onSuccess(
        "Amazing 🙌. You'll now receive encouraging messages once a day. Unsubscribe at any time."
      )
    } catch (error) {
      const { response } = error
      if (response.status === 400) {
        this.onError('Confirmation code is invalid 😢')
        return
      }
      console.error('error', error)
    } finally {
      this.setState({ loading: false })
    }
  }

  renderForm = () => {
    if (this.state.submitted) {
      return null
    }
    if (this.state.phone) {
      return (
        <CodeForm
          onSubmit={this.onCodeSubmitted}
          onValidationError={this.onError}
          loading={this.state.loading}
        />
      )
    }

    return (
      <PhoneNumberForm
        onSubmit={this.onPhoneNumberSubmitted}
        onValidationError={this.onError}
        loading={this.state.loading}
      />
    )
  }

  render() {
    return (
      <div css={{}}>
        <video
          autoPlay
          loop
          muted
          css={{
            width: '100%',
            height: '70vh',
            objectFit: 'cover',
            marginBottom: 60,
            background: 'red'
          }}
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>
        <div
          css={{
            maxWidth: 700,
            margin: '0 auto',
            padding: 60
          }}
        >
          <h2
            css={{
              fontSize: '2em',
              fontWeight: 400,
              fontFamily: 'Indie Flower'
            }}
          >
            Tiny Care Bot
          </h2>
          <p
            css={{
              marginBottom: 10
            }}
          >
            While technology can be a great way to connect, screen addiction and
            comparing ourselves to others can really take a toll on our
            well-being. Tiny Care Bot offers gentle reminders to improve your
            health online.{' '}
          </p>
          <p
            css={{
              marginBottom: 70
            }}
          >
            Subscribe and you’ll receive encouraging text messages like{' '}
            <em>"Get some fresh air please"</em> and{' '}
            <em>"Please take a quick second to stay hydrated"</em> once a day.{' '}
          </p>
          <ReasonsList />
          <p
            css={{
              marginBottom: 10
            }}
          >
            Subscribe and you’ll receive <strong>one</strong> friendly text
            message a day to help you focus on what matters most, disconnect
            when you need to, and create healthy habits.
          </p>
          <p
            css={{
              marginBottom: 80
            }}
          >
            Your privacy is especially important here, and you can unsubscribe
            at any time by responding with <em>"unsubscribe"</em>. Take care.
          </p>

          <Alert text={this.state.alertText} color={this.state.alertColor} />
          {this.renderForm()}
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              padding: '80px 0 0 0'
            }}
          >
            <div
              css={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 auto',
                opacity: 0.3,
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              <span
                css={{
                  marginRight: 5
                }}
              >
                Text messages sent using
              </span>
              <img
                src="/Twilio.svg"
                css={{
                  height: 22
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

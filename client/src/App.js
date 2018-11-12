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
              Break the Twitch
            </span>
          </div>
          <p>
            Screen addiction is real and it’s detremental to our well-being.
            Break the Twitch, spend more time stimulating your sesnses, spending
            time in nature, listening to music.
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
              Stay Connected
            </span>
          </div>
          <p>
            There has never been more ways to connect and yet, our generation is
            the loneliness. Tiny Care reminds you to text back your friends.
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
              Love Your Body
            </span>
          </div>
          <p>
            The greatest wealth is good health. Trouble is, we take good health
            for granted. Tiny Care Bot tries to help by reminding you to eat
            nutritiously, check your posture and stretch.
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
          css={{
            width: '100%',
            height: '80vh',
            objectFit: 'cover',
            marginBottom: 60
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
              marginBottom: 70
            }}
          >
            While technology can be a great way to connect, online harassment
            and trolls can sour Internet life. Tiny Care Bot offers gentle
            reminders to improve your health and well-being online. Subscribe
            and you’ll receive encouraging text messages like{' '}
            <em>"Get some fresh air please"</em>
            and <em>"Please take a quick second to stay hydrated"</em> once a
            day.
          </p>
          <ReasonsList />
          <p
            css={{
              marginBottom: 80
            }}
          >
            Subscribe and you'll receive <strong>one</strong> friendly text
            message a day. Your privacy is very important to me and you can
            subscribe at any time by responding with teh word{' '}
            <em>"unsubscribe"</em>. Take care.
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

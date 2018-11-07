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
            Lorem ipsum dolor amet pok pok edison bulb echo park cold-pressed
            selfies. Lorem ipsum dolor.
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
              Smile
            </span>
          </div>
          <p>
            Lorem ipsum dolor amet pok pok edison bulb echo park cold-pressed
            selfies. Lorem ipsum dolor amet pok pok edison bulb echo park.
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
                src="/feedback.svg"
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Be present
            </span>
          </div>
          <p>
            Lorem ipsum dolor amet pok pok edison bulb echo park cold-pressed
            selfies.
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
        "Amazing 🙌. You'll now receive encouraging messages once or twice a day. Unsubscribe at any time."
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
        <img
          src="https://images.unsplash.com/photo-1517439270744-8d9287c2f8f8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcc4318e8227a0be97ad7fd1199d5624&auto=format&fit=crop&w=2584&q=80"
          css={{
            width: '100%',
            height: '80vh',
            objectFit: 'cover',
            '@media (max-width: 420px)': {
              padding: 0
            }
          }}
        />
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
            and trolls can sour Internet life. I built Carebot to make self-care
            an important part of your life online. Carebot offers gentle
            reminders to improve your health and well-being. Subscribe and
            you’ll receive encouraging messages like{' '}
            <em>“Get some fresh air please”</em>
            and <em>“Please take a quick second to stay hydrated”</em> once a
            day.
          </p>
          <ReasonsList />
          <p
            css={{
              marginBottom: 80
            }}
          >
            Lorem ipsum dolor amet helvetica polaroid plaid tbh, skateboard
            street art man braid narwhal farm-to-table church-key. Kale chips
            literally poutine polaroid farm-to-table sartorial jean shorts hot
            chicken knausgaard bespoke drinking vinegar lo-fi.{' '}
          </p>
          <Alert text={this.state.alertText} color={this.state.alertColor} />
          {this.renderForm()}
          <p
            css={{
              marginTop: 120,
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
              background: 'red',
              width: 'auto'
            }}
          >
            <span
              css={{
                marginRight: 7
              }}
            >
              Powered by
            </span>
            <img
              src="/Twilio.svg"
              css={{
                height: 28
              }}
            />
          </p>
        </div>
      </div>
    )
  }
}

export default App

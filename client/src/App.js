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
    background: #e6e3e2;
    font-family: system-ui;
  }

  .react-phone-number-input__input {
    border-bottom: none;
  }
`

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
      this.onSuccess(`Confirmation code sent to ${phone}`)
    } catch (error) {
      const { response } = error
      if (response.status === 409) {
        this.onError(
          `number +${countryCode}${phone} is already in the database`
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
      this.onSuccess('u in he db')
    } catch (error) {
      const { response } = error
      if (response.status === 400) {
        this.onError('invalid code boiii')
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
      <div
        css={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: 30
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1517439270744-8d9287c2f8f8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcc4318e8227a0be97ad7fd1199d5624&auto=format&fit=crop&w=2584&q=80"
          css={{
            width: '100%',
            height: '80vh',
            objectFit: 'cover'
          }}
        />
        <div
          css={{
            lineHeight: '1.4em',
            fontFamily: 'PT Serif',
            maxWidth: 500,
            margin: '60px auto',
            textAlign: 'justify'
          }}
        >
          <p>
            While social media can be a great way to connect, online harassment
            and trolls can sour Internet life; however, a new Twitter bot is
            trying to make self-care important part of your life online.
          </p>
          <p>
            The bot, which you can find on Twitter @tinycarebot, offers gentle
            reminders to its followers to improve their health and well-being.
            Some examples of their encouraging messages are{' '}
            <span>“breathe deeply please”</span> and{' '}
            <span>“please remember to look up from your screen.”</span>
          </p>
        </div>

        <Alert text={this.state.alertText} color={this.state.alertColor} />
        {this.renderForm()}
      </div>
    )
  }
}

export default App

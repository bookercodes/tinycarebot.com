import { render } from 'react-dom'
import React, { Component } from 'react'
import { injectGlobal, css } from 'emotion'
import { post } from 'axios'
import {
  Header,
  Body,
  Footer,
  PhoneNumberForm,
  CodeForm,
  Alert
} from './components'
import 'react-phone-number-input/style.css'

injectGlobal`
  body {
    background: #EDEDED;
    margin: 0;
    font-family: 'Open Sans', sans;
    line-height: 1.8em;
  }

  .react-phone-number-input__input {
    border-bottom: none;
  }
`

class App extends Component {
  state = {
    countryCode: '',
    phone: '',

    alertText: '',
    loading: false,
    submitted: false
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
          `Whops. The number +${countryCode}${phone} is already in our database.`
        )
        return
      }
      console.error('error', error.response)
    } finally {
      this.setState({ loading: false })
    }
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
      <div>
        <Header />
        <div
          className={css({
            maxWidth: 700,
            margin: '0 auto',
            padding: 60
          })}
        >
          <Body />
          <Alert text={this.state.alertText} color={this.state.alertColor} />
          {this.renderForm()}
          <Footer />
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

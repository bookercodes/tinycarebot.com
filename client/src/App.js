/** @jsx jsx */

import { Component } from 'react'
import { injectGlobal } from 'emotion'
import { jsx } from '@emotion/core'
import PhoneNumberForm from './PhoneNumberForm'
import CodeForm from './CodeForm'
import 'react-phone-number-input/style.css'
import { post } from 'axios'

injectGlobal`
  body {
    background: #e6e3e2;
  }

  .react-phone-number-input__input {
    border-bottom: none;
  }
`

class App extends Component {
  state = {
    phone: '',
    countryCode: '',
  }

  onPhoneNumberSubmitted = async ({ phone, countryCode }) => {
    try {
      await post(
        'https://aphlvvdrjk.execute-api.eu-west-2.amazonaws.com/dev/subscribers',
        {
          countryCode,
          phone,
        }
      )
      this.setState({ phone, countryCode })
    } catch (error) {
      console.error('error', error)
    }
  }

  onCodeSubmitted = async ({ code }) => {
    try {
      await post(
        'https://aphlvvdrjk.execute-api.eu-west-2.amazonaws.com/dev/code',
        {
          countryCode: this.state.countryCode,
          phone: this.state.phone,
          token: code,
        }
      )
    } catch (error) {
      console.error('error', error)
    }
  }

  render() {
    return (
      <div
        css={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: 30,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1517439270744-8d9287c2f8f8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcc4318e8227a0be97ad7fd1199d5624&auto=format&fit=crop&w=2584&q=80"
          css={{
            width: '100%',
            height: '80vh',
            objectFit: 'cover',
          }}
        />
        <div
          css={{
            lineHeight: '1.4em',
            fontFamily: 'PT Serif',
            maxWidth: 500,
            margin: '60px auto',
            textAlign: 'justify',
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
        {this.state.phone ? (
          <div
            css={{
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            <p
              css={{
                textAlign: ' center',
              }}
            >
              Confirmation code sent to {this.state.phone}
            </p>
            <CodeForm onSubmit={this.onCodeSubmitted} />
          </div>
        ) : (
          <PhoneNumberForm onSubmit={this.onPhoneNumberSubmitted} />
        )}
      </div>
    )
  }
}

export default App

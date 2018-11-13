/** @jsx jsx */

import { Component } from 'react'
import { jsx } from '@emotion/core'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { parsePhoneNumber } from 'libphonenumber-js'
import Loader from './Loader'

export default class PhoneNumberForm extends Component {
  state = {
    number: '',
    error: ''
  }

  onSubmit = e => {
    e.preventDefault()
    if (!isValidPhoneNumber(this.state.number)) {
      this.props.onValidationError(
        "That doesn't look like a valid phone number 🧐?"
      )
    } else {
      const { countryCallingCode, nationalNumber } = parsePhoneNumber(
        this.state.number
      )
      this.props.onSubmit({
        phone: nationalNumber,
        countryCode: countryCallingCode
      })
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        css={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          margin: '0 auto',
          borderRadius: 5,
          '@media (max-width: 409px)': {
            flexDirection: 'column'
          }
        }}
      >
        <PhoneInput
          disabled={this.props.loading}
          css={{
            flex: 1,
            paddingLeft: 20,
            borderBottom: 'none',
            '@media (max-width: 409px)': {
              width: '90%',
              padding: 10
            }
          }}
          country="GB"
          placeholder="Your mobile phone number, please"
          value={this.state.number}
          onChange={number => this.setState({ number })}
        />
        <button
          type="submit"
          css={{
            background: '#98a390',
            outline: 'none',
            border: 'none',
            width: 200,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            height: 53,
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
              background: '#72796c'
            },
            '@media (max-width: 409px)': {
              width: '100%',
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 5
            }
          }}
        >
          {this.props.loading ? (
            <Loader
              css={{
                width: 25,
                height: 'auto'
              }}
            />
          ) : (
            <span>Continue</span>
          )}
        </button>
      </form>
    )
  }
}

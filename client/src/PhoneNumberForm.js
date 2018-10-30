/** @jsx jsx */

import { Component } from 'react'
import { jsx } from '@emotion/core'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { parsePhoneNumber } from 'libphonenumber-js'

export default class PhoneNumberForm extends Component {
  state = {
    number: '+447899320957',
  }

  onSubmit = e => {
    e.preventDefault()
    const { countryCallingCode, nationalNumber } = parsePhoneNumber(
      this.state.number
    )
    if (isValidPhoneNumber(this.state.number)) {
      this.props.onSubmit({
        phone: nationalNumber,
        countryCode: countryCallingCode,
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
          maxWidth: 500,
          margin: '0 auto',
          borderRadius: 5,
        }}
      >
        <PhoneInput
          css={{
            flex: 1,
            paddingLeft: 20,
            borderBottom: 'none',
          }}
          country="GB"
          placeholder="Enter phone number"
          value={this.state.number}
          onChange={number => this.setState({ number })}
        />
        <input
          type="submit"
          css={{
            background: '#98a390',
            outline: 'none',
            border: 'none',
            width: 120,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            padding: 20,
            cursor: 'pointer',
            '&:hover': {
              background: '#72796c',
            },
          }}
        />
      </form>
    )
  }
}

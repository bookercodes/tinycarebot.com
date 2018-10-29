/** @jsx jsx */

import { Component } from 'react'
import { jsx } from '@emotion/core'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default class Input extends Component {
  state = {
    phone: '',
  }
  render() {
    return (
      <div
        css={{
          background: 'white',
          maxWidth: 500,
          margin: '0 auto',
          borderRadius: 5,
        }}
      >
        {this.state.phone}
        <form
          css={{
            display: 'flex',
            alignItems: 'center',
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
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
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
            }}
          />
        </form>
      </div>
    )
  }
}

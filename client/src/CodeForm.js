/** @jsx jsx */

import { Component } from 'react'
import { jsx } from '@emotion/core'
import 'react-phone-number-input/style.css'

export default class PhoneNumberForm extends Component {
  state = {
    code: '',
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit({ code: this.state.code })
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        css={{
          background: 'white',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Enter confirmation code"
          value={this.state.code}
          onChange={e => this.setState({ code: e.target.value })}
          css={{
            fontFamily: 'system-ui',
            padding: 10,
            border: 'none',
            outline: 'none',
            flex: 1,
          }}
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
    )
  }
}

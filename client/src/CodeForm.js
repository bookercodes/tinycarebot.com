/** @jsx jsx */

import { Component } from 'react'
import { jsx } from '@emotion/core'
import 'react-phone-number-input/style.css'
import Loader from './Loader'

export default class PhoneNumberForm extends Component {
  state = {
    code: ''
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
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          maxWidth: 500,
          margin: '0 auto',
          borderRadius: 5
        }}
      >
        <input
          type="text"
          placeholder="Enter confirmation code"
          value={this.state.code}
          onChange={e => this.setState({ code: e.target.value })}
          css={{
            padding: 10,
            border: 'none',
            outline: 'none',
            flex: 1
          }}
        />
        <button
          type="submit"
          css={{
            background: '#98a390',
            outline: 'none',
            border: 'none',
            width: 120,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            height: 53,
            cursor: 'pointer',
            '&:hover': {
              background: '#72796c'
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
            <span>Submit</span>
          )}
        </button>
      </form>
    )
  }
}

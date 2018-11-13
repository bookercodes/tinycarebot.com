/** @jsx jsx */
import React, { Component } from 'react'
import { jsx } from '@emotion/core'

class Footer extends Component {
  render() {
    return (
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
            src="/twilio.svg"
            alt="Twilio"
            css={{
              height: 22
            }}
          />
        </div>
      </div>
    )
  }
}
export default Footer

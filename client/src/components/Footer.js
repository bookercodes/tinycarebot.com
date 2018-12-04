import React from 'react'
import { css } from 'emotion'

export default () => (
  <div
    className={css({
      display: 'flex',
      justifyContent: 'center',
      padding: '80px 0 0 0'
    })}
  >
    <a
      href="https://twilio.com"
      className={css({
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        opacity: 0.3,
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
          opacity: 1
        }
      })}
    >
      <span
        className={css({
          marginRight: 5
        })}
      >
        Text messages sent using
      </span>
      <img
        src="/twilio.svg"
        alt="Twilio"
        className={css({
          height: 22
        })}
      />
    </a>
  </div>
)

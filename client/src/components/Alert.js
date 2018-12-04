import React from 'react'
import { css } from 'emotion'

export default ({ text, color }) => (
  <div
    className={css({
      padding: 2,
      background: color,
      borderRadius: 5,
      margin: '10px auto'
    })}
  >
    <p
      className={css({
        textAlign: ' center'
      })}
    >
      {text}
    </p>
  </div>
)

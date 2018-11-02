/** @jsx jsx */
import { Component } from 'react'
import { jsx } from '@emotion/core'

export default ({ text, color }) => {
  if (text) {
    return (
      <div
        css={{
          maxWidth: 500,
          padding: '2px 0',
          background: color,
          borderRadius: 5,
          margin: '10px auto'
        }}
      >
        <p
          css={{
            textAlign: ' center'
          }}
        >
          {text}
        </p>
      </div>
    )
  }
  return null
}

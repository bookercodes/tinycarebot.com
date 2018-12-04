import React from 'react'
import { css } from 'emotion'

export default () => (
  <div
    className={css({
      overflow: 'hidden'
    })}
  >
    <video
      autoPlay
      loop
      muted
      className={css({
        width: '100%',
        height: '80vh',
        objectFit: 'cover'
      })}
    >
      <source src="/header.mp4" type="video/mp4" />
    </video>
  </div>
)

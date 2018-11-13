/** @jsx jsx */
import { Component } from 'react'
import { jsx } from '@emotion/core'

class Banner extends Component {
  render() {
    return (
      <div
        css={{
          overflow: 'hidden'
        }}
      >
        <video
          autoPlay
          loop
          muted
          css={{
            width: '100%',
            height: '80vh',
            objectFit: 'cover'
          }}
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }
}

export default Banner

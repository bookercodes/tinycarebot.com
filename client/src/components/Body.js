/** @jsx jsx */

import React, { Component } from 'react'
import ReasonsList from './ReasonsList'
import { jsx } from '@emotion/core'
class FooBar extends Component {
  render() {
    return (
      <div>
        <h2
          css={{
            fontSize: '2em',
            fontWeight: 400,
            fontFamily: 'Indie Flower'
          }}
        >
          Tiny Care Bot
        </h2>
        <p
          css={{
            marginBottom: 10
          }}
        >
          While technology can be a great way to connect, screen addiction and
          comparing ourselves to others can really take a toll on our
          well-being. Tiny Care Bot offers gentle reminders to improve your
          health online.{' '}
        </p>
        <p
          css={{
            marginBottom: 70
          }}
        >
          Subscribe and you’ll receive encouraging text messages like{' '}
          <em>"Get some fresh air please"</em> and{' '}
          <em>"Please take a quick second to stay hydrated"</em> once a day.{' '}
        </p>
        <ReasonsList />
        <p
          css={{
            marginBottom: 10
          }}
        >
          Subscribe and you’ll receive <strong>one</strong> friendly text
          message a day to help you focus on what matters most, disconnect when
          you need to, and create healthy habits.
        </p>
        <p
          css={{
            marginBottom: 80
          }}
        >
          Your privacy is especially important here, and you can unsubscribe at
          any time by responding with <em>"unsubscribe"</em>. Take care.
        </p>
      </div>
    )
  }
}
export default FooBar

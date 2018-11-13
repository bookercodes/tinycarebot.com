/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Component } from 'react'
import FriendlyIcon from './FriendlyIcon'
import RespectIcon from './RespectIcon'
import SmileIcon from './SmileIcon'

class ReasonsList extends Component {
  render() {
    return (
      <ul
        css={{
          listStyle: 'none',
          paddingLeft: 0,
          display: 'flex',
          marginBottom: 60
        }}
      >
        <li
          css={{
            flex: 1,
            padding: 10
          }}
        >
          <div>
            <span
              css={{
                fontFamily: 'Indie Flower',
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <RespectIcon
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Break the twitch
            </span>
          </div>
          <p>
            When you get a notification, is your knee-jerk reaction to reach for
            your phone? If so, it might be healthy to disconnect more often.
            Tiny Care Bot reminds you how.
          </p>
        </li>
        <li
          css={{
            flex: 1,
            padding: 10
          }}
        >
          <div>
            <span
              css={{
                fontFamily: 'Indie Flower',
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <SmileIcon
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Stay connected
            </span>
          </div>
          <p>
            There has never been more ways to connect online and yet,{' '}
            <a
              href="https://www.bbc.co.uk/bbcthree/article/5a5db873-bc83-4159-9006-57a4d689f902"
              css={{
                textDecoration: 'none',
                fontWeight: 600,
                color: '#728860'
              }}
            >
              research suggests our generation is the loneliness
            </a>
            . This tiny bot reminds you to engage with your friends in
            meaningful ways.
          </p>
        </li>
        <li
          css={{
            flex: 1,
            padding: 10
          }}
        >
          <div>
            <span
              css={{
                fontFamily: 'Indie Flower',
                fontSize: '1.4em',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FriendlyIcon
                css={{
                  width: 45,
                  marginRight: 10
                }}
              />
              Love your body
            </span>
          </div>
          <p>
            Please, please take the time to eat nutritious food, check your
            posture often, and stretch.{' '}
          </p>
        </li>
      </ul>
    )
  }
}

export default ReasonsList

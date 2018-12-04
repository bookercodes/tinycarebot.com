import React from 'react'
import { css } from 'emotion'
import { RespectIcon, SmileIcon, FriendlyIcon } from './icons'

const featureHeader = css({
  fontFamily: 'Indie Flower',
  fontSize: '1.4em',
  display: 'flex',
  alignItems: 'center'
})
const featureIcon = css({
  width: 45,
  marginRight: 10
})

export default () => (
  <div>
    <h2
      className={css({
        fontSize: '2em',
        fontWeight: 400,
        fontFamily: 'Indie Flower'
      })}
    >
      Tiny Care Bot
    </h2>
    <p
      className={css({
        marginBottom: 10
      })}
    >
      While technology can be a great way to connect, screen addiction and
      comparing ourselves to others can really take a toll on our well-being.
      Tiny Care Bot offers gentle reminders to improve your health online.{' '}
    </p>
    <p
      className={css({
        marginBottom: 70
      })}
    >
      Subscribe and you’ll receive encouraging text messages like{' '}
      <em>"Get some fresh air please"</em> and{' '}
      <em>"Please take a quick second to stay hydrated"</em> once a day.{' '}
    </p>
    <ul
      className={css({
        listStyle: 'none',
        paddingLeft: 0,
        display: 'flex',
        marginBottom: 60
      })}
    >
      <li
        className={css({
          flex: 1,
          padding: 10
        })}
      >
        <div>
          <span className={featureHeader}>
            <RespectIcon className={featureIcon} />
            Break the twitch
          </span>
        </div>
        <p>
          When you get a notification, is your knee-jerk reaction to reach for
          your phone? If so, it might be healthy to disconnect more often. Tiny
          Care Bot reminds you how.
        </p>
      </li>
      <li
        className={css({
          flex: 1,
          padding: 10
        })}
      >
        <div>
          <span className={featureHeader}>
            <SmileIcon className={featureIcon} />
            Stay connected
          </span>
        </div>
        <p>
          There has never been more ways to connect online and yet,{' '}
          <a
            href="https://www.bbc.co.uk/bbcthree/article/5a5db873-bc83-4159-9006-57a4d689f902"
            className={css({
              textDecoration: 'none',
              fontWeight: 600,
              color: '#728860'
            })}
          >
            research suggests our generation is the loneliness
          </a>
          . This tiny bot reminds you to engage with your friends in meaningful
          ways.
        </p>
      </li>
      <li
        className={css({
          flex: 1,
          padding: 10
        })}
      >
        <div>
          <span className={featureHeader}>
            <FriendlyIcon className={featureIcon} />
            Love your body
          </span>
        </div>
        <p>
          Please, please take the time to eat nutritious food, check your
          posture often, and stretch.{' '}
        </p>
      </li>
    </ul>
    <p
      className={css({
        marginBottom: 10
      })}
    >
      Subscribe and you’ll receive <strong>one</strong> friendly text message a
      day to help you focus on what matters most, disconnect when you need to,
      and create healthy habits.
    </p>
    <p
      className={css({
        marginBottom: 80
      })}
    >
      Your privacy is especially important here, and you can unsubscribe at any
      time by responding with <em>"unsubscribe"</em>. Take care.
    </p>
  </div>
)

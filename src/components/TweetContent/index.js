/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types' // ES6

import Styled from './styled'

const ComponentName = 'TweetContent'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { text, trailUrl } = props
  return (
    <Styled.TweetContent>
      <div>{text}</div>
      {trailUrl && (
        <a href={trailUrl} target="_blank" rel="noreferrer">
          <span>{trailUrl}</span>
        </a>
      )}
    </Styled.TweetContent>
  )
}

Component.propTypes = {
  text:     PropTypes.string.isRequired,
  trailUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

}

Component.displayName = ComponentName

export default Component

import React from 'react'
import PropTypes from 'prop-types' // ES6

import Styled from './styled'

const ComponentName = 'Username'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { text } = props
  return (
    <Styled.Username>
      <h4>{`@${text}`}</h4>
    </Styled.Username>
  )
}

Component.propTypes = {
  text: PropTypes.string.isRequired,
}
Component.displayName = ComponentName

export default Component

import React from 'react'
import PropTypes from 'prop-types' // ES6

import Styled from './styled'

const ComponentName = 'HashtagFilter'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { children } = props
  return (
    <Styled.HashtagFilter>
      {ComponentName}
    </Styled.HashtagFilter>
  )
}

Component.propTypes = {
  children: PropTypes.node.isRequired,

}
Component.displayName = ComponentName

export default Component

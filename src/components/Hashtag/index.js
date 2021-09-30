import React from 'react'
import PropTypes from 'prop-types' // ES6

import Styled from './styled'

const ComponentName = 'Hashtag'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { text, onClick, selected } = props
  return (
    <Styled.Hashtag selected={!!selected} onClick={onClick}>
      {text[0] === '#' ? text : `#${text}`}
    </Styled.Hashtag>
  )
}

Component.propTypes = {
  text:     PropTypes.string.isRequired,
  onClick:  PropTypes.func,
  selected: PropTypes.bool,

}
Component.defaultProps = {
  onClick:  () => {},
  selected: false,
}
Component.displayName = ComponentName

export default Component

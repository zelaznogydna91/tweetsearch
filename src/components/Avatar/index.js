import React from 'react'
import PropTypes from 'prop-types' // ES6

import Styled from './styled'

const ComponentName = 'Avatar'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { img } = props
  return (
    <Styled.Avatar>
      <img src={img} alt="User Avatar" />
    </Styled.Avatar>
  )
}

Component.propTypes = {
  img: PropTypes.string.isRequired,

}
Component.displayName = ComponentName

export default Component

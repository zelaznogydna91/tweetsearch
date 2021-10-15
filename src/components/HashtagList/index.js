/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types' // ES6

import Hashtag from 'components/Hashtag'

import Styled from './styled'

const ComponentName = 'HashtagList'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const {
    hashtags,
    withEmptyCaption,
    onHashtagClick,
    selectionMap,
    noAction,
  } = props

  return (
    <Styled.HashtagList>
      {hashtags.length > 0
        ? hashtags.map(
          (hash) => (
            <Hashtag
              key={hash}
              text={hash}
              selected={selectionMap[hash]}
              onClick={noAction ? null : () => onHashtagClick(hash)}
            />
          ),
        )
        : withEmptyCaption ? 'No hashtags found' : ''}
    </Styled.HashtagList>
  )
}

Component.propTypes = {
  hashtags:         PropTypes.arrayOf(PropTypes.string).isRequired,
  onHashtagClick:   PropTypes.func,
  selectionMap:     PropTypes.object.isRequired,
  withEmptyCaption: PropTypes.bool,
  noAction:         PropTypes.bool,

}
Component.defaultProps = {
  onHashtagClick: () => {},
}
Component.displayName = ComponentName

export default Component

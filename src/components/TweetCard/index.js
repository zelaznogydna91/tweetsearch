import React from 'react'
import PropTypes from 'prop-types' // ES6

import Username from 'components/Username'
import Avatar from 'components/Avatar'
import TweetContent from 'components/TweetContent'
import HashtagList from 'components/HashtagList'

import Styled from './styled'

const ComponentName = 'TweetCard'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { data, odd, selectionMap } = props
  return (
    <Styled.TweetCard odd={odd}>
      <Avatar img={data.avatarUrl} />
      <Styled.TweetContentWrapper>
        <Username text={data.username} />
        <TweetContent text={data.tweetContent} trailUrl={data.trailUrl} />
        <HashtagList noAction hashtags={data.hashtags} selectionMap={selectionMap} />
      </Styled.TweetContentWrapper>
    </Styled.TweetCard>
  )
}

Component.propTypes = {
  data:         PropTypes.object.isRequired,
  odd:          PropTypes.bool.isRequired,
  selectionMap: PropTypes.object.isRequired,

}
Component.displayName = ComponentName

export default Component

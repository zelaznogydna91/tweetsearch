import React from 'react'
import PropTypes from 'prop-types' // ES6
import TweetCard from 'components/TweetCard'
import { ReactComponent as EmptySVG } from 'assets/empty.svg'

import Styled from './styled'

const ComponentName = 'TweetList'

const Component = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { tweets, selectionMap } = props
  return (
    <Styled.TweetList>
      {
        tweets.length > 0
          ? tweets.map(
            (tweet, index) => (
              <TweetCard
                selectionMap={selectionMap}
                key={tweet.id}
                odd={index % 2 !== 0}
                data={tweet}
              />
            ),
          )
          : (
            <Styled.EmptyWrapper>
              <div><EmptySVG width={350} height={158} /></div>
              <span>Hint: Type something to search</span>
            </Styled.EmptyWrapper>
          )
      }
    </Styled.TweetList>
  )
}

Component.propTypes = {
  tweets:       PropTypes.array.isRequired,
  selectionMap: PropTypes.object.isRequired,

}
Component.displayName = ComponentName

export default Component

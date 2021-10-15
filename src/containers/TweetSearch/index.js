/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types' // ES6
import SearchField from 'components/SearchField'
import HashtagList from 'components/HashtagList'
import TweetList from 'components/TweetList'

import useTweets from './twitterHook'
import Styled from './styled'

const ContainerName = 'TweetSearch'

const Container = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { tweetsFetcher } = props
  const [tweetsState, tweetsActions] = useTweets(tweetsFetcher)
  const {
    searchValue,
    selectableFilters,
    filteredTweets,
    activeFiltersMap,
    snackbar,
  } = tweetsState

  return (
    <Styled.TweetSearch>
      <Styled.HeaderWrapper id="header-wrapper">Tweet Feed</Styled.HeaderWrapper>
      <Styled.Snackbar visible={snackbar.visible}>
        {snackbar.message}
      </Styled.Snackbar>

      <Styled.SearchWrapper id="search-wrapper">
        <SearchField onChange={tweetsActions.setSearchValue} searchString={searchValue} />
      </Styled.SearchWrapper>

      <Styled.HashtagsWrapper id="hashtags-wrapper">
        <Styled.HeaderWrapper>Filter by hashtag</Styled.HeaderWrapper>
        <HashtagList
          hashtags={selectableFilters}
          withEmptyCaption
          onHashtagClick={tweetsActions.toggleHashtagFilter}
          selectionMap={activeFiltersMap}
        />
      </Styled.HashtagsWrapper>

      <Styled.TweetListWrapper>
        <TweetList tweets={filteredTweets} selectionMap={activeFiltersMap} />
        {filteredTweets.length > 0 && (
          <Styled.Button
            onClick={tweetsActions.loadMore}
          >
            Load More
          </Styled.Button>
        )}
      </Styled.TweetListWrapper>

      {/* <Styled.Todo>
        <h4>TODO</h4>
        {todos.map((todo) => <div>{todo}</div>)}
      </Styled.Todo> */}

    </Styled.TweetSearch>

  )
}

Container.propTypes = {
  tweetsFetcher: PropTypes.func.isRequired,

}
Container.displayName = ContainerName

export default Container

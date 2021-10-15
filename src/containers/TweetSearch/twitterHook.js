/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  useReducer, useMemo, useRef, useEffect,
} from 'react'
import lodash from 'lodash'
import u from 'utils'

const DEBOUNCE_DELAY = 500

/**
 * @template T
 * @typedef {T extends (...args) => infer R ? R : never} ResultSchema
 */

/**
 * @typedef {ResultSchema<typeof userActions>} TweetsActions
 */

/**
 * @typedef {object} Tweet
 * @property {string} id
 * @property {string} avatarUrl
 * @property {string} username
 * @property {string[]} hashtags
 * @property {string} tweetContent
 * @property {string=} trailUrl
 */

/**
 * @typedef {object} PublicState
 * @property {string[]} selectableFilters
 * @property {{}} activeFiltersMap
 * @property {string}      searchValue
 * @property {Tweet[]}  filteredTweets
 * @property {boolean}  loadingTweets
 */

/**
 * @typedef {object} PrivateState
 * @property {string[]} allFilters
 * @property {Tweet[]}  tweets
 */

const initialState = {
  allFilters:        [],
  selectableFilters: [],
  activeFiltersMap:  {},
  searchValue:       '',
  tweets:            [],
  filteredTweets:    [],
  loadingTweets:     false,
  snackbar:          { message: '', visible: false },
}

const ActionsTypes = {
  toggleHashtagFilter: 'toggleHashtagFilter',
  isLoading:           'isLoading',
  fetchTweetsDone:     'fetchTweetsDone',
  fetchTweetsErrored:  'fetchTweetsErrored',
  updateSearchValue:   'updateSearchValue',
  hideSnackbar:        'hideSnackbar',
}

/**
 * @param {(PublicState & PrivateState)} state
 */
const reducer = (state, action) => {
  if (u.inDevMode) console.log('ACTION', action)

  switch (action.type) {
    case ActionsTypes.isLoading: {
      const restartUpdate = !action.shouldRestart ? {} : {
        allFilters:        [],
        selectableFilters: [],
        activeFiltersMap:  {},
        tweets:            [],
        filteredTweets:    [],
      }
      return { ...state, ...restartUpdate, loadingTweets: !!state.searchValue }
    }
    case ActionsTypes.hideSnackbar: {
      return { ...state, snackbar: { message: '', visible: false } }
    }

    case ActionsTypes.fetchTweetsDone: {
      const prevIdSet = new Set(state.tweets.map((x) => x.id))
      const newLoadedTweets = action.tweets.filter((x) => !prevIdSet.has(x.id))
      const newTweetList = [...state.tweets, ...newLoadedTweets]
      const hashtagSet = new Set(state.allFilters)

      newLoadedTweets.forEach((tweet) => {
        tweet.hashtags.forEach((hash) => {
          hashtagSet.add(hash)
        })
      })

      // Recalculating filtered tweets
      const displayAll = Object.keys(state.activeFiltersMap).length === 0
      const newFilteredTweets = newTweetList.filter(
        (tweet) => displayAll || tweet.hashtags
          .some((hash) => state.activeFiltersMap[hash]),
      )
      // Recalculating selectable filters
      const selectableSet = new Set()
      newFilteredTweets.forEach((tweet) => {
        tweet.hashtags.forEach((hash) => {
          selectableSet.add(hash)
        })
      })
      const snackbar = {}

      if (newLoadedTweets.length === 0) {
        snackbar.visible = true
        snackbar.message = 'No new tweets for now...'
      }

      return {
        ...state,
        allFilters:        [...hashtagSet],
        filteredTweets:    newFilteredTweets,
        loadingTweets:     false,
        selectableFilters: [...selectableSet],
        tweets:            newTweetList,
        snackbar,
      }
    }

    case ActionsTypes.updateSearchValue: {
      return {
        ...state,
        searchValue:   action.value,
        loadingTweets: true,
        allFilters:    [],
      }
    }

    case ActionsTypes.toggleHashtagFilter: {
      const {
        activeFiltersMap,
        tweets,
      } = state

      // Update selection map
      const newMap = { ...activeFiltersMap }
      if (!newMap[action.hashtag]) {
        newMap[action.hashtag] = true
      } else {
        delete newMap[action.hashtag]
      }
      // Recalculating filtered tweets
      const displayAll = Object.keys(newMap).length === 0
      const newFilteredTweets = tweets.filter(
        (tweet) => displayAll || tweet.hashtags
          .some((hash) => newMap[hash]),
      )
      // Recalculating selectable filters
      const selectableSet = new Set()
      newFilteredTweets.forEach((tweet) => {
        tweet.hashtags.forEach((hash) => {
          selectableSet.add(hash)
        })
      })

      return {
        ...state,
        filteredTweets:    newFilteredTweets,
        selectableFilters: [...selectableSet],
        activeFiltersMap:  newMap,
      }
    }

    default:
      return state
  }
}

const userActions = (loader, dispatch, activeFiltersMap, mem) => {
  const getSearchQuery = (searchString) => {
    const activeFilters = Object.keys(activeFiltersMap)
    return `${searchString} ${activeFilters.map((hash) => `#${hash}`).join(' ')}`
  }

  const fetchTweets = (searchString) => {
    if (u.inDevMode) console.log(`%cfetching tweets\n> prev: "${mem.lastSearchValue}", curr: "${searchString}"`, 'color: blue;')

    const shouldRestart = mem.lastSearchValue !== searchString
    mem.lastSearchValue = searchString
    dispatch({ type: ActionsTypes.isLoading, shouldRestart })
    if (!searchString) return
    loader(getSearchQuery(searchString), mem.lastTweetId)
      .then((tweets) => {
        if (tweets.length) {
          tweets = tweets.sort()
          mem.lastTweetId = tweets[0].id
        }
        dispatch({
          type: ActionsTypes.fetchTweetsDone,
          tweets,
        })
      })
      .catch((e) => {
        dispatch({ type: ActionsTypes.fetchTweetsErrored, errorMsg: e.message })
      })
  }

  const debouncedFetch = lodash.debounce(fetchTweets, DEBOUNCE_DELAY)

  const loadMore = () => {
    fetchTweets(mem.lastSearchValue)
  }

  return {
    loadMore,
    toggleHashtagFilter: (hashtag) => dispatch({ type: ActionsTypes.toggleHashtagFilter, hashtag }),
    setSearchValue:      (value) => {
      debouncedFetch(value)
      return dispatch({ type: ActionsTypes.updateSearchValue, value })
    },
  }
}

/**
 * Custom Hook to manage TweetSearch widget.
 * @param {(searchString: string)=>Promise<Tweet[]>} loader
 * @returns {[PublicState, TweetsActions]}
 */
function useTweets(loader) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.snackbar.visible) {
      setTimeout(() => {
        dispatch({ type: ActionsTypes.hideSnackbar })
      }, 2500)
    }
  }, [state.snackbar.visible])

  const memRef = useRef({
    lastSearchValue: false,
    lastTweetId:     undefined,
  })

  const { activeFiltersMap } = state
  const actions = useMemo(
    () => userActions(loader, dispatch, activeFiltersMap, memRef.current),
    [loader, activeFiltersMap],
  )
  return [state, actions]
}

export default useTweets

/* eslint-disable no-console */
import axios from 'axios'
import u from 'utils'

class ServerError extends Error {
  constructor(error) {
    super(error.message)
    this.server_error = error
  }
}

const fetchTweets = (searchString, lastTweetId) => axios.get('/api/fetchTweets', {
  params: {
    searchString,
    lastTweetId,
  },
})
  .then((response) => {
    const { data } = response
    if (data.ok) {
      return data.tweets
    }
    throw new ServerError(data.error)
  })
  .catch((e) => {
    let errorMsg
    if (e instanceof ServerError) {
      if (u.inDevMode) console.error('SERVER Error fetchingTweets\n> ', e, e.server_error)
      errorMsg = `SERVER side Error, with message: ${e.message}`
    } else {
      if (u.inDevMode) console.error('CLIENT Error fetchingTweets\n> ', e)
      errorMsg = `CLIENT side Error, with message: ${e.message}`
    }
    throw new Error(errorMsg)
  })

const twitterAPI = {
  fetchTweets,
}

export default twitterAPI

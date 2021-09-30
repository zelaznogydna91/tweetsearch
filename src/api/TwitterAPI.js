/* eslint-disable no-console */
import axios from 'axios'

const fetchTweets = (searchString, lastTweetId) => axios.get('/api/fetchTweets', {
  params: {
    searchString,
    lastTweetId,
  },
})
  .then((response) => {
    const { data } = response
    return data
  })
  .catch((e) => {
    console.log('Error fetchTweets', e)
  })

const twitterAPI = {
  fetchTweets,
}

export default twitterAPI

const express = require('express')
const axios = require('axios')
require('dotenv').config()

const FETCH_AMOUNT = 5
const RESULT_TYPE = 'popular'
const LANGUAGE = 'en'

const PORT = process.env.SERVER_PORT || 3001

const AUTH_TOKEN = process.env.TWITTER_AUTH_TOKEN || 'NO TOKEN WAS PROVIDED CHECK .env config'
const SEARCH_TWEETS_API_URL = process.env.TWITTER_SEARCH_ENDPOINT || 'https://api.twitter.com/1.1/search/tweets.json'

const regex = /https:[\w/.]+$/
const getLastUrl = (text) => (text.match(regex) || [false])[0]

const app = express()

app.get('/api/fetchTweets', (req, res) => {
  const { searchString, lastTweetId } = req.query

  axios.get(SEARCH_TWEETS_API_URL, {
    params: {
      q:           searchString,
      since_id:    lastTweetId,
      count:       FETCH_AMOUNT,
      result_type: RESULT_TYPE,
      lang:        LANGUAGE,
    },
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  })
    .then((response) => {
      const { data } = response
      const tweets = data.statuses.map((rawTweet) => {
        const lastUrl = getLastUrl(rawTweet.text)
        const text = rawTweet.text.replace(lastUrl, '')
        return {
          id:           rawTweet.id,
          avatarUrl:    rawTweet.user.profile_image_url_https,
          username:     rawTweet.user.screen_name,
          hashtags:     rawTweet.entities.hashtags.map((hash) => hash.text),
          tweetContent: text,
          trailUrl:     lastUrl,
        }
      })
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(tweets))
    })
    .catch((e) => {
    // debugger
      console.log('e', e)
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

import React from 'react'
import 'normalize.css'
import './App.css'
import TweetSearch from 'containers/TweetSearch'
import twitterAPI from 'api/TwitterAPI'
import u from 'utils'

/**
 *
 *  Pass: can't search for a term after searching for a previous term and loading more.
 *  Load more never disappears. DONE
 *  Load more button has default cursor but is clickable but hashtag
 *   within tweet has pointer but is not clickable. DONE
 */

function App() {
  // #region ------------------ TODOS -----------------
  // eslint-disable-next-line no-unused-vars
  const todos = [
    ['fix', 'The search is failing when changing from regular string to hashtags. A bug in the reducer and a side effect probably.'],
    ['implement', 'Increase test coverage'],
    ['nice', 'Increase query complexity'],
    ['nice', 'Preview Links'],
  ]
  const printTodo = u.inDevMode
  if (printTodo) {
    // console.info('🚧 🚧 🚧 ----------- TODO LIST -----------🚧 🚧 🚧')
    todos.forEach((todo) => {
      switch (todo[0]) {
        case 'fix':
          // console.error('❗️❗️❗️', todo[1])
          break

        case 'implement':
          // console.warn('🛠 🛠 🛠', todo[1])
          break

        case 'nice':
          // console.info('😎💤', todo[1])
          break

        default:
          break
      }
    })
    // console.info('🚧 🚧 🚧 ----------- TODO LIST ----------- 🚫 Disable this log at src/App.js')
  }
  // #endregion
  return (
    <div>
      <TweetSearch tweetsFetcher={twitterAPI.fetchTweets} />
    </div>
  )
}

export default App

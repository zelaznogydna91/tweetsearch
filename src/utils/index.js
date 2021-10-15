/* eslint-disable no-unused-vars */
let number = 1
const colors = 400
const nextColor = (numberOfColors) => () => {
  // eslint-disable-next-line no-plusplus
  const hue = ((number += 50) % numberOfColors) + 1 * 137.508 // use golden angle approximation
  return `hsl(${hue},50%,75%)`
}
// const getColor = nextColor(colors)
const getColor = () => {}

function getHashtags(tweets) {
  return ['#Felipe', '#Freedom'].map((hash) => tweets.length + hash)
}

const Colors = {
  // By role
  primary:             '#1DA1F2', // Twitter's
  secondary:           '#FFFFFF',
  success:             '#4BB543',
  error:               '#ff0033',
  warning:             '#FDC410',
  text:                '#2D3134',
  clear:               'rgba(0,0,0,0)',
  overlay:             'rgba(51,51,51,0.7)',
  fadedPrime:          'rgba(35,87,137,0.7)',
  fadedBlack:          'rgba(0,0,0,0.7)',
  hover:               'rgba(0,0,0,0.05)',
  hashtagBack:         '#E4F3FB',
  linkText:            '#4784BB',
  // Twitter's
  blue:                '#1DA1F2',
  black:               '#14171A',
  darkGray:            '#657786',
  lightGray:           '#AAB8C2',
  extraLightGray:      '#E1E8ED',
  extraextraLightGray: '#F5F8FA',
  backdrop:            '#F8F9F9',
}

const inDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default {
  inDevMode,
  getColor,
  getHashtags,
  Colors,
}

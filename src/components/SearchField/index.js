import React from 'react'
import PropTypes from 'prop-types' // ES6

import Styled from './styled'

const ComponentName = 'SearchField'

const Component = (props) => {
  const { onChange, searchString, loading } = props

  const handleChange = (e) => {
    onChange(e.target.value)
  }
  return (
    <Styled.SearchField>
      <img src="./images/search.png" alt="lipa" />
      <Styled.Input placeholder="Search by keyword" type="text" value={searchString} onChange={handleChange} />
      {loading && <Styled.Spinner />}
    </Styled.SearchField>
  )
}

Component.propTypes = {
  onChange:     PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  loading:      PropTypes.bool.isRequired,

}
Component.displayName = ComponentName

export default Component

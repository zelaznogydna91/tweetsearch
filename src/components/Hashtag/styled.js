import styled from 'styled-components/macro'
import u from 'utils'

export default {
  Hashtag: styled.div`
  background-color: ${({ selected }) => (selected ? u.Colors.linkText : u.Colors.hashtagBack)};
  border: none;
  color: ${({ selected }) => (selected ? u.Colors.hashtagBack : u.Colors.linkText)};
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 0px;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  border-radius: 16px;
  height: fit-content;

  
`,
}

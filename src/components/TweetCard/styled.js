import styled from 'styled-components'

export default {
  TweetCard: styled.div`
    display: flex;
    padding: 16px;
    background-color: ${(props) => (props.odd ? '#fff' : '#F8F9F9')};
    &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
    &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`,
  TweetContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
`,

}

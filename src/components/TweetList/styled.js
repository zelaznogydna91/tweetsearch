import styled from 'styled-components/macro'
import u from 'utils'

export default {
  TweetList: styled.div`
`,
  EmptyWrapper: styled.div`
    background-color: ${u.getColor()};
    display: flex;
    flex-direction: column;
    align-items: center;

  &>div {
    margin: 24px;
  }
  &>span {
    font-size: 16px;
    font-weight: 200;
    margin-bottom: 24px;

  }
`,
}

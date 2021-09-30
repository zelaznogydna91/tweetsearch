import styled from 'styled-components/macro'
import u from 'utils'

export default {
  TweetContent: styled.div`
    margin-bottom: 16px;
    &>a {
      color: ${u.Colors.linkText};
    }
`,
}

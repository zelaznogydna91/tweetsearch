import styled, { keyframes, css } from 'styled-components/macro'
import u from 'utils'

const fadein = keyframes`
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
`
const fadeout = keyframes`
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
`
const showAnimation = css`
  animation: ${fadein} 0.5s forwards; 
`
const hideAnimation = css`
  animation: ${fadeout} 0.5s forwards; 
`

export default {
  TweetSearch: styled.div`
  background-color: #F8F9F9;
  box-sizing: border-box;
  padding: 48px;
  border-radius: 8px;
  margin-top: 36px;
  min-width: 375px;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  @media (max-width: 768px) {
    grid-template-areas:
      'header'
      'search'
      'hash'
      'list';
    padding: 0;
    border-radius: 0;
    margin-top: 0px;
    background-color: ${u.Colors.secondary};

    #header-wrapper {
      padding: 0px 16px;
    }

    #search-wrapper {
      padding: 10px 16px;
      top: 0;
      margin: 0;
    }
    
    #hashtags-wrapper {
      margin-left: 0px;
      top: 70px;
    }
  }
  grid-template-areas:
    'header header  header  header'
    'search search  search  hash'
    'list   list    list    hash';
`,
  HeaderWrapper: styled.h4`
  grid-area: header;
  background-color: ${u.getColor()};
  color: ${u.Colors.text};
  margin-bottom: 0;
`,

  SearchWrapper: styled.div`
  position: sticky;
  top: 0px;
  grid-area: search;
  background-color: ${u.getColor()};
  height: fit-content;
  margin-bottom: 0px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  margin-left: -20px;
  padding-right: 10px;
  margin-right: -10px;
  background-color: ${u.Colors.backdrop};
  /* box-shadow: 0 2px 10px rgb(0 0 0 / 0.2); */
  box-shadow: 0px 4px 15px ${u.Colors.backdrop};

  /* background-color: green; */
`,
  HashtagsWrapper: styled.div`
  position: sticky;
  top: 10px;
  grid-area: hash;
  background-color: ${u.Colors.secondary};
  background-color: ${u.getColor()};
  min-width: 150px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.2);
  margin-bottom: 16px;
  padding: 0 16px 16px 16px;
  height: fit-content;
  margin-left: 24px;
  border-radius: 4px;
`,
  TweetListWrapper: styled.div`
  grid-area: list;
  background-color: ${u.Colors.secondary};
  background-color: ${u.getColor()};
  margin-top: 4px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.2);
  border-radius: 4px;
  display:flex;
  flex-direction: column;
`,
  Button: styled.button`
    background-color: transparent;
    border: 0px ;
    padding:24px;
    color: ${u.Colors.linkText};

    &:hover {
        background-color: #00000010;
    }
`,
  Snackbar: styled.div`
    border-radius: 10px;
    min-width: 250px;
    margin-left: -125px;
    background-color: #1DA1F2;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
    ${(props) => (props.visible ? showAnimation : hideAnimation)}
`,
}

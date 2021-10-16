import styled from 'styled-components/macro'
import u from 'utils'
import Spinner from './spinner'

export default {
  SearchField: styled.div`
    border-color: ${u.Colors.darkGray};
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    display: flex;
    background-color: ${u.Colors.secondary};


    &>img {
      filter: saturate(30%);
      transform: scale(0.55);
      
    }

    &>input:focus {
      outline: none
    }

`,
  Input: styled.input`
    color:  ${u.Colors.text}; 
    border-radius: 4px;
    border-style: none;
    box-sizing: border-box;
    font-family: "Franklin Gothic" sans-serif;
    font-size: 100%;
    line-height: 1.15;
    padding: 0px;
    width: 100%;
`,
  Spinner: styled(Spinner)`
    height: 20px;
    transform: scale(0.5);
`,
}

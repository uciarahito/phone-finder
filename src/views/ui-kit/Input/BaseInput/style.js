import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  > div.text-validation {
    font-size: 11px;
    color: #e53935;
  }
`

const InputContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 2px;
  background-color: #111316;
  ${props => props.isError && `
    border: solid 1px #e53935
  `};

  > input {
    background-color: #111316;
    color: #ffffff;
    outline: none;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: none;
    width: 80%;
    font-size: 11px;
    letter-spacing: 0.1px;
    -webkit-appearance: none;
  }

  input:read-only {
    color: #868686;
    cursor: initial;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #111316 inset;
    box-shadow: 0 0 0px 1000px #111316 inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  :focus-within {
    box-shadow: ${props => (!props.isError ? `0px 0px 5px 0px rgba(1, 134, 213, 0.6)` : 'unset')};
    background-color: #111316;
    border: solid 1px
      ${props => (!props.isError ? '#ffffff' : '#e53935')};
  }

  > input:focus {
    background-color: #111316;
  }

  > input::-webkit-search-cancel-button {
    display: none;
  }

  > input::-moz-search-cancel-button {
    display: none;
  }

  > input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  > div.icon-search {
    cursor: pointer;
    width: 16.3px;
    height: 16px;
    margin-right: 5px;
    line-height: 1;
    opacity: 0.6;
  }
`

export { InputContainer, MainContainer }

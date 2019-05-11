import React from 'react'
import styled from 'styled-components'

export const Header = styled.h1`
	text-align: center;
	font-family: sans-serif;
	color: red;
	font-size: 68px;
`;

export const StatCheckBoxWrapper = styled.div`
  display: flex;
  width: 300px;
  margin: auto;
`;

export const Input = styled.input`
	font-family: sans-serif;
  text-decoration: none;
  text-align: center;
  outline: none;
  color: #2E8DDF;
  font-size: 3em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 4px solid #2E8DDF;
  border-radius: 3px;
  opacity: 0.7;
  transition: 0.3s;
  display: flex;
  width: 300px;
`;

export const Wrapper = styled.div`
  text-align: center;
`;

// Hide the native checkbox element and replace it with a styled version

// The label element will be solely responsible for triggering the 
// onChange callback of the Checkbox since the native checkbox element
// will be visually hidden.
const CheckboxContainer = styled.label`  
  margin: auto;
`

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => (props.checked ? '#2E8DDF' : 'white')};
  border-radius: 3px;
  transition: all 150ms;
  border: 4px solid #2E8DDF;
  opacity: 0.7;
  margin: auto;


  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`;

export const Checkbox = ({ checked, ...props }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} {...props}/>
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)


export const Message = styled.div`
  font-family: sans-serif;
  text-decoration: none;
  text-align: center;
  outline: none;
  color: #2E8DDF;
  font-size: 2.8em;
  opacity: 0.7;
  margin: auto;
`;
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: Center;
`;

export const PageHeading = styled.div`
  width: 100%;
  height: 12%;
  background-color: #2E8DDF;
`;

export const Wrapper = styled.div`
	position: relative;
	display: block;
`;

export const Button = styled.button`
  font-family: sans-serif;
  text-decoration: none;
  text-align: center;
  outline: none;
  ${props => props.color ? `color: ${props.color};`: `color: #2E8DDF`};
  font-size: 3em;
  margin: 1em;
  padding: 0.25em 1em;
  ${props => props.color ? `color: ${props.color};`: `color: #2E8DDF`};
  ${props => props.color ? `border: 4px solid ${props.color};`: `border: 4px solid #2E8DDF;`};
  border-radius: 3px;
  opacity: 0.3;
  transition: 0.3s;
  width: 400px;

  &:hover {
    opacity: 1;
  }
`;

export const StartButton = styled(Button)`
  height: 75px;
  width: 400;
  margin: auto;
  background-color: ${props => props.color};
  opacity: 0.7;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

export const NavButton = styled(NavLink)`
  font-family: sans-serif;
  text-decoration: none;
  text-align: center;
  outline: none;
  color: #2E8DDF;
  font-size: 3em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 4px solid #2E8DDF;
  border-radius: 3px;
  opacity: 0.7;
  transition: 0.3s;
  display: inline-block;
  width: 300px;

  &:hover {
    opacity: 1;
  }
`;

export const Text = styled.h4`
	text-align: center;
	font-family: sans-serif;
	color: white;
	font-size: 26px;
	position: relative;
	display: block;
`;

export const Tile = styled.div`
  height: 95%;
  width: 95%;
  border: 4px solid orange;
  border-radius: 1px;
  margin: 0 auto;
  justify-content: Center;
  display:flex;
  
  & img {
    height: 30%;
    width: 20%;
  }
`;

export const MiniTile = styled.div`
  background-color: ${props => props.color};
  /* border: 1px solid black; */
  border-radius: 1px;
  margin: auto;
  display: inline;
`;

export const Bar = styled.div`
  background-color: lightblue;
  display: flex;
  margin: 2px;
`;
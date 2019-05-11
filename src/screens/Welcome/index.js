
import React, { Component } from 'react';
import { Header } from './components';
import { NavButton, Container } from '../../components/general';

export default class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <Header>Welcome to Larry Presidents</Header>
        <Container>
          <NavButton to={'/login'}>Login</NavButton>
          <NavButton to={'/create-account'}>Create Account</NavButton>
          <NavButton onClick={this.sendMessage} to={'/create-game'}>Create Game</NavButton>
          <NavButton to={'/join-game'}>Join Game</NavButton>
        </Container>
      </React.Fragment>
    )
  }
}
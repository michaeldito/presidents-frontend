
import React, { Component } from 'react';
import { NavButton, Container, Text, Wrapper, PageHeading } from '../../components/general';
import { GameLink } from './components';

const games = ['a', 'b', 'c', 'd', 'e', 'f'];

export default class JoinGame extends Component {
  render() {
    return (
      <React.Fragment>

        <Container>
          <NavButton to='/'>
            Go Back
          </NavButton>
        </Container>

        <PageHeading>
          <Text>Join Game</Text>
        </PageHeading>

        <Container>
          <Wrapper>
            {games.map(name => <GameLink key={name} name={name} />)}
          </Wrapper>
        </Container>

      </React.Fragment>
    )
  }
}
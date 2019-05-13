import React from 'react';
import { NavButton, Container } from '../../components/general';

export const GameLink = ({ name, joinGame }) =>
  <React.Fragment>
    <Container>
      <div onClick={() => joinGame()}>
        <NavButton to={`/game`}>{name}</NavButton>
      </div>
    </Container>
  </React.Fragment>

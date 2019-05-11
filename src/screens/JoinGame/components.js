import React from 'react';
import { NavButton, Container } from '../../components/general';

export const GameLink = ({ name }) =>
  <React.Fragment>
    <Container>
      <NavButton to={`/game`}>{name}</NavButton>
    </Container>
  </React.Fragment>

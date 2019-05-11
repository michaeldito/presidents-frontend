
import React, { Component } from 'react';
import { Tile, Wrapper } from '../general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '../general';
import { Name, IconWrapper, CardsLeft } from './components';

export default class PlayerSquare extends Component {
  render() {
    return (
      <Tile>     
        <Container>
          <Wrapper>
          <IconWrapper>
            <FontAwesomeIcon className='fa-3x' icon="user-circle" />
          </IconWrapper>
          <Name>Name</Name>
          <CardsLeft>#</CardsLeft>
        </Wrapper>
        </Container>
      </Tile>
    )
  }
}


import React, { Component } from 'react';
import { Tile, StartButton, Container } from '../general';

export default class CenterSquare extends Component {
  render() {
    return (
      <Tile>      
        <Container>
          <StartButton color='green'>START</StartButton>
        </Container>
      </Tile>
    )
  }
}
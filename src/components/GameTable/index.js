
import React, { Component } from 'react';
import { GameFrame, Table, Body, Row, Cell } from './components';
import PlayerSquare from '../PlayerSquare';
import CenterSquare from '../CenterSquare';

export default class GameTable extends Component {
  render() {
    return (
      <GameFrame>
        <Table>
          <Body>
          
            <Row>
              <Cell>
                <PlayerSquare />
              </Cell>
              <Cell>
                <PlayerSquare />
              </Cell>
              <Cell>
                <PlayerSquare />
              </Cell>
            </Row>

            <Row>
              <Cell>
                <PlayerSquare />
              </Cell>
              <Cell>
                <CenterSquare />
              </Cell>
              <Cell>
                <PlayerSquare />
              </Cell>
            </Row>

            <Row>
              <Cell>
                <PlayerSquare />
              </Cell>
              <Cell>
                <PlayerSquare />
              </Cell>
              <Cell>
                <PlayerSquare />
              </Cell>
            </Row>

          </Body>
        </Table>
      </GameFrame>
    )
  }
}
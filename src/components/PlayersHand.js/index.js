import React, { Component } from 'react';
import { Bar, Container, Wrapper } from '../general';
import Card from '../../components/Card';
import { CardTable, CardBody, CardRow, CardCell, CardCount } from './components';

const ranks = ['2','3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'J', 'Q', 'K', 'A'];
const cells = ranks.map((rank, idx) => 
  <CardCell key={idx}>
    <Card rank={rank} suite={'H'} />
    <CardCount>#</CardCount>
  </CardCell>)

export default class PlayersHand extends Component {
  render() {
    return (
      <Bar>
        <Container>
          <Wrapper>
            <CardTable>
              <CardBody>
                <CardRow>
                  {cells}
                </CardRow>
              </CardBody>
            </CardTable>
          </Wrapper>
        </Container>
      </Bar>
    )
  }
}
import React, { Component } from 'react';
import StatData from '../StatData';
import { Bar } from '../general';

const cards = ['2','3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'J', 'Q', 'K', 'A'];
const cardComponents = cards.map((card, idx) => <StatData key={idx} card={card} />);

export default class Stats extends Component {
  render() {
    return (
      <React.Fragment>
        <Bar>
          {cardComponents}
        </Bar>
      </React.Fragment>
    )
  }
}
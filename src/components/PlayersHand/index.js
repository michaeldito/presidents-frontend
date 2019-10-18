
import React from 'react';
import 'antd/dist/antd.css';
import { Row, Button } from 'antd';


// TODO:
// convert to function
export default class PlayersHand extends React.Component {
  cards = () => {
    let cards = []
    if (this.props.cards !== undefined) {
      cards = this.props.cards;
    }
    return cards;
  }
  render() {
    console.log(`[PlayersHand@render] cards: ${this.cards()}`)

    let cardComponents = this.cards().map((card, idx) => 
      <div style={{margin: '10px'}} key={idx}>
        <Button type="secondary">
          {card.cardRank.value} {card.suit.character}
        </Button>
      </div>
    )
    
    return (
      <Row type="flex" justify="start">
        {cardComponents}
      </Row>
    )
  }
}

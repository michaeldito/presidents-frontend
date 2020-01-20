
import React from 'react';
import 'antd/dist/antd.css';
import { Row, Button, Typography } from 'antd';
import styled from 'styled-components';

const FadeIn = styled.div`
	@keyframes FadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	animation: FadeIn ${props => props.speed || 0.4}s;
  margin: 10px;
`;


const PlayersHand = ({ cards = [], selectedCards = [], selectCard, sortKey }) => {
  const ascending = (a, b) => (a.cardRank.value > b.cardRank.value ? 1 : -1);
  cards = cards.sort(ascending);
  cards = sortKey === 'asc' ? cards : cards.reverse();
  
  const CardComponents = () => cards.map((card, idx) =>  {
    let cardIsSelected = selectedCards.find(c => c.shortHand === card.shortHand);
    let style = { backgroundColor: `${! cardIsSelected ? card.suit.color : 'green'}` };
    return (
      <FadeIn key={idx} onClick={() => selectCard(card)}>
        <Button size='large' style={style}>
          <Typography.Text strong style={{color: 'white'}}>
            {card.cardRank.character} {card.suit.character}
          </Typography.Text>
        </Button>
      </FadeIn>)
  });
  
    
  return (
    <Row type="flex" justify="start">
      <CardComponents />
    </Row>
  )
}

export default PlayersHand;
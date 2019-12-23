
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Button, Typography } from 'antd';
import { GameButton } from './components';
import styled from 'styled-components';

const FadeIn = styled.div`
	@keyframes FadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	animation: FadeIn ${props => props.speed || 2}s;
  margin: 10px;
`;


const PlayersHand = ({ cards = [], gameId, playCards, pass, drinkDrink }) => {

  let [selectedCards, setSelectedCards] = useState([]);

  const selectCard = card => {
    console.log(`[PlayersHand@selectCard] card selected: ${card.shortHand}`);
    const alreadyAdded = selectedCards.find(c => c.shortHand === card.shortHand);

    if (alreadyAdded) {
      console.log(`[PlayersHand@selectCard] removing card: ${card.shortHand}`);
      let updatedSelectedCards = selectedCards.filter(c => c.shortHand !== card.shortHand);
      console.log(`[PlayersHand@selectCard] updatedCardsSelected: ${updatedSelectedCards.map(c => c.shortHand)}`);
      setSelectedCards(updatedSelectedCards);
    } else {
      console.log(`[PlayersHand@selectCard] selecting card: ${card.shortHand}`);
      let updatedSelectedCards = selectedCards.concat([card]);
      console.log(`[PlayersHand@selectCard] updatedCardsSelected: ${updatedSelectedCards.map(c => c.shortHand)}`);
      setSelectedCards(updatedSelectedCards);
    }
  }

  const submitCards = () => {
    playCards(gameId, selectedCards);
    setSelectedCards([]);
  }

  const CardComponents = () => cards.map((card, idx) =>  {
    let cardIsSelected = selectedCards.find(c => c.shortHand === card.shortHand);
    let type = cardIsSelected ? 'danger' : 'secondary';
    return (
      <FadeIn key={idx} onClick={() => selectCard(card)}>
        <Button size='large' type={type}>
          <Typography.Text strong>
            {card.cardRank.character} {card.suit.character}
          </Typography.Text>
        </Button>
      </FadeIn>)
  });
  
    
  return (
    <React.Fragment>

      <GameButton icon='play-circle' action={() => submitCards} title='Play Cards' />
      <GameButton icon='forward' action={() => pass()} title='Pass' />
      <GameButton icon='coffee' action={() => drinkDrink()} title='Drink' />

      <Row type="flex" justify="start">
        <CardComponents />
      </Row>
      
    </React.Fragment>
  )
}

export default PlayersHand;
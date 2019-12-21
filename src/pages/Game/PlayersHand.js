
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Button, Typography } from 'antd';


const PlayersHand = ({ cards = [], gameId, playCards, pass, drinkDrink }) => {

  let [selectedCards, setSelectedCards] = useState([]);
  let [showCards, setShowCards] = useState(true);

  const toggleCards = () => {
    setShowCards(! showCards);
  }

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

  const cardComponents = () => {
    return cards.map((card, idx) =>  {
      let cardIsSelected = selectedCards.find(c => c.shortHand === card.shortHand);
      let type = cardIsSelected ? 'danger' : 'secondary';
      return (
        <div style={{margin: '10px'}} key={idx} onClick={() => selectCard(card)}>
          <Button size='large' type={type}>
            <Typography.Text strong>
            {card.cardRank.character} {card.suit.character}
            </Typography.Text>
          </Button>
        </div>)
    });
  }
    
  return (
    <React.Fragment>

      <Button style={{marginRight:10, backgroundColor: '#001529', color: 'white'}} icon='play-circle' onClick={() => submitCards()}> Play Cards </Button>
      <Button style={{marginRight:10, backgroundColor: '#001529', color: 'white'}} icon='forward' onClick={() => pass()}> Pass </Button>
      <Button style={{marginRight:10, backgroundColor: '#001529', color: 'white'}} icon='coffee' onClick={() => drinkDrink()}> Drink </Button>
      
      <Typography.Title 
        style={{cursor: 'pointer', marginTop: 10}} 
        level={4}
        onClick={() => toggleCards()}
      >
        Your Hand
      </Typography.Title>

      {
        showCards ? 
          <Row type="flex" justify="start">
            {cardComponents()}
          </Row> : null
      }
      
    </React.Fragment>
  )
}

export default PlayersHand;
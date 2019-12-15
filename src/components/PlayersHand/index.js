
import React from 'react';
import 'antd/dist/antd.css';
import { Row, Button, Typography } from 'antd';


// TODO:
// convert to function
export default class PlayersHand extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCards: [],
      showCards: true
    };
  }

  toggleCards = () => {
    this.setState({showCards: !this.state.showCards});
  }

  selectCard = (card) => {
    console.log(`[PlayersHand@onClick] card selected: ${card.shortHand}`);
    const alreadyAdded = this.state.selectedCards.find(c => c.shortHand === card.shortHand);

    if (alreadyAdded) {
      console.log(`removing card`);
      console.log(this.state)
      let newState = this.state.selectedCards.filter(c => c.shortHand !== card.shortHand);
      console.log(newState);
      this.setState({selectedCards: newState});

    } else {
      console.log(`adding card`);
      console.log(this.state)
      let newState = this.state.selectedCards.concat([card]);
      console.log(newState);
      this.setState({selectedCards: newState});
    }
  }

  playCards = () => {
    const { gameId, playCards } = this.props;
    playCards(gameId, this.state.selectedCards);
    this.setState({selectedCards: []})
  }

  cards = () => {
    let cards = []
    if (this.props.cards !== undefined) {
      cards = this.props.cards;
    }
    return cards;
  }

  render() {
    console.log(`[PlayersHand@render] cards: ${this.cards()}`)

    let cardComponents = this.cards().map((card, idx) =>  {

      let type;
      let cardIsSelected = this.state.selectedCards.find(c => c.shortHand === card.shortHand);
      if (cardIsSelected) {
        type = 'danger';
      } else {
        type = 'secondary';
      }

      return (
        <div style={{margin: '10px'}} key={idx} onClick={() => this.selectCard(card)}>
          <Button size='large' type={type}>
            <Typography.Text strong>
            {card.cardRank.character} {card.suit.character}
            </Typography.Text>
          </Button>
        </div>)
    });
    
    return (
      <React.Fragment>

        <Button style={{marginRight:10, backgroundColor: '#001529', color: 'white'}} icon='play-circle' onClick={() => this.playCards()}> Play Cards </Button>
        <Button style={{marginRight:10, backgroundColor: '#001529', color: 'white'}} icon='forward' onClick={() => this.props.pass()}> Pass </Button>
        <Button style={{marginRight:10, backgroundColor: '#001529', color: 'white'}} icon='coffee' onClick={() => this.props.drinkDrink()}> Drink </Button>

        <Typography.Title 
          style={{cursor: 'pointer', marginTop: 10}} 
          level={4}
          onClick={() => this.toggleCards()}
        >
          Your Hand
        </Typography.Title>

        {
          this.state.showCards ? 
            <Row type="flex" justify="start">
              {cardComponents}
            </Row> : null
        }

      </React.Fragment>
    )
  }
}


import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import PlayerSquare from '../../components/PlayerSquare';
import { Layout, Row, Col, Card, Typography, Tag } from 'antd';


// TODO:
// convert to function
export class InfoSquare extends React.Component {
  
  render() {
    let { handToBeat } = this.props;

    console.log(`InfoSquare@render] handToBeat: ${handToBeat}`)
    console.log(`InfoSquare@render] handToBeat === undefined: ${handToBeat === undefined}`);

    let title = <Typography.Text type="secondary">hand to beat</Typography.Text>
    let shouldRender = handToBeat === [] ? false : true;

    if (shouldRender) {
      return (
        <div style={{padding: '5px'}}>
          <Card size='medium' style={{padding:'10px'}} title={title}>
            <Layout>
                <Layout.Content style={{backgroundColor: 'white'}}>

                  {handToBeat.map((card, idx) => 
                    <span key={idx} style={{margin: '10px'}}>
                      <Tag type="dis">
                        {card.cardRank.character} {card.suit.character}
                      </Tag>
                    </span>
                  )}
                  
                </Layout.Content>
            </Layout>
          </Card>
      </div>
      )
    } else {
      return <div></div>
    }
  }
}

InfoSquare.propTypes = {
	handToBeat: PropTypes.array
}

InfoSquare.defaultProps = {
	handToBeat: []
}
   

// TODO:
// convert to function
export class GameArea extends React.Component {
  handToBeat = () => {
		let handToBeat = [];
		if (this.props.game.handToBeat !== undefined) {
			handToBeat = this.props.game.handToBeat;
		}
		return handToBeat;
  }
  players = () => {
		let players = [];
		if (this.props.game.players !== undefined) {
			players = this.props.game.players;
		}
		return players;
	}
  render() {
    let { game } = this.props;
    let { currentPlayer } = game;

    console.log(`[GameArea:render] game: ${JSON.stringify(game, null, 2)}`)
    console.log(`[GameArea:render] players: ${this.players()}`)

    return (
      <Row type="flex" justify="start">

        <Col span={8}>
          <InfoSquare handToBeat={this.handToBeat()}/>
        </Col>

        {this.players().map((player, idx) => 
          <Col span={8} key={idx}>
            <PlayerSquare player={player} currentPlayer={currentPlayer}/>
          </Col>
        )}
      </Row>
    )
  }
}

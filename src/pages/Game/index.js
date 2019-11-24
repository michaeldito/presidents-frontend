
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Modal, PageHeader, Typography, Button, Tag, Card, Steps } from 'antd';
import { PlayersHand } from '../../components';
import { GameArea } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { playCards, pass, giveDrink, drinkDrink, startGame, updateGame, rematch } from '../../actions';
import Moment from 'react-moment';
const { Content } = Layout;
const { Step } = Steps;

function calculateColor(value) {
  switch (value) {
    case 'NOT_STARTED': return 'green';
    case 'IN_PROGRESS': return 'blue';
    case 'FINALIZED': return 'volcano';
    default: return 'geekblue';
  }
}

class Game extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			visible: true,
			showCardsRemaining: false,
			showYourHand: true
		}
	}

	toggleCardsRemaining = () => {
		this.setState({showCardsRemaining: !this.state.showCardsRemaining});
	}
	toggleYourHand = () => {
		this.setState({showYourHand: !this.state.showYourHand});
	}

	start = () => {
		let id = this.props.game._id;
		this.props.startGame(id);
	}

	statusValue = () => {
		let status = '';
		if (this.props.game.status !== undefined) {
			status = this.props.game.status.value;
		}
		return status;
	}


	name = () => {
		let name = '';
		if (this.props.game !== undefined) {
			name = this.props.game.name;
		}
		return name;
	}

	turnsTaken = () => {
		if (this.props.game.turnToBeat !== undefined) {

			let rounds = this.props.game.rounds;
			let turns = [];
			rounds.forEach(round => {
				round.turns.forEach(turn => {
					turns.push(turn);
				});
			});
			console.log(turns)
			
			let users = {};
			this.props.game.players.forEach(player => { 
				users[player.user._id] = player.user;
			});
			console.log(users)
			turns = turns.reverse().map(turn => {
				console.log(turn._id === this.props.game.turnToBeat._id)
				let style = turn._id === this.props.game.turnToBeat._id ?
					{
						border: '2px solid #f5222d', 
						padding: '10px'
					} : {
						padding: '10px'
					}
				
				return (
					<div style={{padding: '5px'}}>
						<Card size="small" title={users[turn.user].username} style={style}>
						{
							turn.wasPassed ? 'Pass' : turn.wasSkipped ? 'Skipped' : 
							turn.cardsPlayed.map(card =>
								<Button>{card.cardRank.character} {card.suit.character}</Button>
							)
						}
						</Card>
					</div>
				)
			});
			
			return turns;
		}
	}

	handleOk = e => {
    this.setState({
      visible: false,
    });
	};
	
	gameOverResults = () => {
		let {players} = this.props.game;
		players = players.map(player => 
			<div>
				<p>{player.user.username}</p>
				<p>{player.nextGameRank.name}</p>
				<p>{player.nextGameRank.name === 'President' ? 'Winner!' : ''}</p>
			</div>
		)
		return <div>{players}</div>
	}
	
  render() {

    const { game } = this.props;
		const { playersHand, cardsRemaining } = game;

		let color = calculateColor(this.statusValue());
		
		let startTime = new Date(this.props.game.createdAt).toLocaleString().replace(/:\d+ /, ' ');

    return (
      <Layout>

				<Modal
						title="Game Over!"
						visible={this.statusValue() === 'FINALIZED' && this.state.visible}
						onOk={this.handleOk}
					>
					{this.statusValue() === 'FINALIZED' && this.state.visible ? this.gameOverResults() : null}
				</Modal>

        <Layout>
          <PageHeader 
						onBack={() => null} 
						title={`Presidents`}
					/>
				          
					<Content style={{ margin: '0 16px' }}>

						<div style={{ padding: 20, background: '#fff' }}>

							<Steps current={1}>
								<Step title="Created" subTitle={startTime}/>
								<Step title="In Progress" 
									subTitle={
										<Moment 
											date={this.props.game.createdAt}
											durationFromNow
										/>
									}
									/>
								<Step title="Complete"/>
							</Steps>

						</div>
						
						<div style={{ marginTop:10, padding: 20, background: '#fff' }}>
						{
							this.statusValue() === 'NOT_STARTED' ? 
							<Button onClick={() => this.start()} size='large' style={{margin: 10, color: 'white', backgroundColor: '#a0d911'}}>Start</Button>
							: null
						}
						{
							this.statusValue() === 'FINALIZED' ? 
							<Button onClick={() => this.props.rematch()} size='large' style={{margin: 10}} type='primary'>Rematch</Button>
							: null
						}
		  				{
								this.state.showYourHand ? 
									<PlayersHand 
										cards={playersHand} 
										gameId={game._id} 
										playCards={this.props.playCards} 
										pass={this.props.pass}
										drinkDrink={this.props.drinkDrink}
									/> : <div></div>
							}

							</div>

							{/* <div style={{marginTop:10}}>

								<Typography.Title level={4}>
									Cards Remaining 
									<Switch style={{marginLeft:10}} size="small" checked={this.state.showCardsRemaining} onClick={() => this.toggleCardsRemaining()}/>
								</Typography.Title>

								{
									this.state.showCardsRemaining ? <CardBoard cards={cardsRemaining}/> : <div></div>
								}

							</div>

							<Divider /> */}

							<div style={{marginTop:10, padding: 20, background: '#fff'}}>

								<Typography.Title level={4}>
									Turns Taken
								</Typography.Title>

								<div style={{overflowY: 'hidden', overflow: 'scroll', width: '100%', display: 'flex', flexWrap: 'nowrap'}}>

									{/* {
										this.previousTurns().map(turn => {
											return (
												<Card size="small" title={turn.user.username}>
													{
														turn.cardsPlayed.map(card => 
															<Button size='large' type='secondary'>
																{card.cardRank.character} {card.suit.character}
															</Button>
														)
													}
												</Card>
											)
										})
									} */}
																							
									{this.turnsTaken()}

								</div>

							</div>

					
            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff'}}>
              <GameArea game={game} giveDrink={this.props.giveDrink} />
            </div>

          </Content>

				</Layout>
      </Layout>
    );
  }
}

Game.defaultProps = {
	game: {
		status: {
			value: ''
		}
	}
};

function mapStateToProps(state) {
	const { game } = state;
	return { game };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		playCards,
		pass,
		giveDrink,
		drinkDrink,
		startGame,
		updateGame,
		rematch
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Game);
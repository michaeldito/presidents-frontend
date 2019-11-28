
import React from 'react';
import 'antd/dist/antd.css';
import axios from '../../config/axios';
import { Layout, Modal, PageHeader, Typography, Button, List, Avatar, Card, Steps, Drawer, Divider } from 'antd';
import { PlayersHand, VideoConnection } from '../../components';
import { GameArea, ChatApp, YouTubeSearch } from './components';
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

function stepNumber(value) {
	switch (value) {
    case 'NOT_STARTED': return 0;
    case 'IN_PROGRESS': return 1;
    case 'FINALIZED': return 2;
    default: return 0;
  }
}

class Game extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			visible: true,
			drawerOpen: false,
			showYourHand: true,
			placement: 'right'
		}
	}

	toggleDrawer = () => {
    this.setState({
      visible: ! this.state.visible
    });
	};
	
	getVideoToken = async () => {
		let payload = {
			identity: encodeURIComponent(this.props.username),
			room: this.props.game._id
		};
		console.log(`payload: ${JSON.stringify(payload)}`)
		const token = await axios.post('/video/token', payload);
		this.setState({token: token.data});
		console.log(`token: ${this.state.token}`)
	};

	videoLogout = () => {
		this.setState({token: null})
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

	users = () => {
		let users = {};
		this.props.game.players.forEach(player => { 
			users[player.user._id] = player.user;
		});
		return users;
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
			
			let users = this.users();
			console.log(users);

			turns = turns.reverse().map(turn => {
				//console.log(turn._id === this.props.game.turnToBeat._id);
				let turnToBeat = this.props.game.turnToBeat;

				let style = turnToBeat !== null && turn._id === turnToBeat._id ?
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

	drinks = () => {
		if (this.props.game.drinks !== undefined && this.props.game.drinks.length > 0) {
			return this.props.game.drinks.reverse().map(drink => {
				if (drink.type === 'drink given') {
					return (
						<div style={{padding: '5px'}}>
							<Card size='small' title='Drink Given'>
								<Typography>{`From ${drink.from.username}`}</Typography>
								<Typography>{`To ${drink.to.username}`}</Typography>
							</Card>
						</div>
					)
				}
				else if (drink.type === 'drink drunk') {
					return (
						<div style={{padding: '5px'}}>
							<Card size='small' title='Drink Drunk'>
								{`By ${drink.user.username}`}
							</Card>
						</div>
					)
				}
			})
		}
	}

	handleOk = e => {
    this.setState({
      visible: false,
    });
	};
	
	gameOverResults = () => {
		const description = player => {
			let desc = '';
			if (player.politicalRank === undefined) {
				desc = `Started as nothing`;
			} 
			else if (player.politicalRank.name === 'Asshole') {
				desc = `Sharted from the bottom`;
			} 
			else {
				desc = `Started as ${player.politicalRank.name}`
			}
			return desc
		}
		
		return <List
			itemLayout="horizontal"
			dataSource={this.props.game.players}
			renderItem={player => (
				<List.Item>
					<List.Item.Meta
						avatar={
							<Avatar>{player.user.username[0].toUpperCase()}</Avatar>
						}
						title={player.user.username}
						description={description(player)}
					/>
					<div>{player.nextGameRank.name}</div>
				</List.Item>
			)}
		/>
	}
	
	toggleDrawer = () => {
		this.setState({drawerOpen: !this.state.drawerOpen});
	}

  render() {

    const { game } = this.props;
		const { playersHand, cardsRemaining } = game;

		let color = calculateColor(this.statusValue());
		
		let startTime = new Date(this.props.game.createdAt).toLocaleString().replace(/:\d+ /, ' ');
		
    return (
      <Layout>

				<Modal
						title="Game Complete"
						visible={this.statusValue() === 'FINALIZED' && this.state.visible}
						// visible={true}
						onOk={this.handleOk}
					>
					{this.statusValue() === 'FINALIZED' && this.state.visible ? this.gameOverResults() : null}
				</Modal>

				<Drawer
          placement={this.state.placement}
          closable={true}
          onClose={this.toggleDrawer}
          visible={this.state.drawerOpen}
        >
					<div style={{height: '100vh'}}>
						<YouTubeSearch />
						<ChatApp username={this.props.username} gameId={this.props.game._id}/>
					</div>
        </Drawer>

        <Layout>

          <PageHeader 
						onBack={() => null} 
						title={`Presidents`}
						subTitle={this.props.username}
					/>
				          
					<Content style={{ margin: '0 16px' }}>

						<div style={{ padding: 20, background: '#fff' }}>
							<Steps current={stepNumber(this.statusValue())}>
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
									<Button onClick={() => this.start()} size='large' style={{margin: 10, color: 'white', backgroundColor: '#a0d911'}}>
										Start
									</Button>
									: null
							}
							
							{
								this.statusValue() === 'FINALIZED' ? 
									<Button onClick={() => this.props.rematch()} size='large' style={{margin: 10}} type='primary'>
										Rematch
									</Button>
									: null
							}

							<Button onClick={() => this.toggleDrawer()} size='large' style={{margin: 10}} type='primary'>
								YouTube & Chat
							</Button>

							<Button onClick={() => this.getVideoToken()} size='large' style={{margin: 10}} type='secondary'>
								Video Chat
							</Button>

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

							<div style={{marginTop:10, padding: 20, background: '#fff', display: 'flex'}}>

								<div style={{float:'left', width: '50%', padding: 10}}>
									<Typography.Title level={4}>
										Turns Taken
									</Typography.Title>

									<div style={{overflowY: 'hidden', overflow: 'scroll', width: '100%', display: 'flex', flexWrap: 'nowrap'}}>
										{this.turnsTaken()}
									</div>
								</div>

								<div style={{float:'none', width: '2', }}>
									<Divider type="vertical" style={{ height: '100%' }}/>
								</div>

								<div style={{float:'right', width: '50%', padding: 10}}>

									<Typography.Title level={4}>
										Drinks
									</Typography.Title>

									<div style={{overflowY: 'hidden', overflow: 'scroll', width: '100%', display: 'flex', flexWrap: 'nowrap'}}>
											{this.drinks()}
									</div>

								</div>

							</div>

					
            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff'}}>
							<GameArea
								game={game} 
								giveDrink={this.props.giveDrink} 
								roomName={game._id}
								token={this.state.token}
								videoLogout={this.videoLogout}
							/>
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
	const { game, user } = state;
	const { username } = user;
	return { game, username };
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
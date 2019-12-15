import React from 'react';
import 'antd/dist/antd.css';
import axios from '../../config/axios';
import { Layout, Modal, PageHeader, Typography, Button, List, Avatar, Card, Steps, Divider, Tooltip } from 'antd';
import { PlayersHand, HoverArea } from '../../components';
import { GameArea } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { playCards, pass, giveDrink, drinkDrink, startGame, updateGame, rematch } from '../../actions';
import Moment from 'react-moment';
const { Content } = Layout;
const { Step } = Steps;


function stepNumber(value) {
	switch (value) {
    case 'NOT_STARTED': return 0;
    case 'IN_PROGRESS': return 2;
    case 'FINALIZED': return 3;
    default: return 0;
  }
}

class Game extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			visible: true,
			hoverAreaSettings: {
				open: false,
				type: ''
			},
			showYourHand: true,
			muteVideo: true
		}
	}

	toggleHoverArea = type => {
		let open = ! this.state.hoverAreaSettings.open;
    this.setState({ 
			hoverAreaSettings: {
				open,
				type
			}
		 });
	};
	
	getVideoToken = async () => {
		if (this.state.token) {
			this.videoLogout();
			return Promise.resolve()
		}
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
						border: '5px solid #d4380d', 
						textAlign: 'center',
						borderRadius: '5px',
					} : {
						textAlign: 'center',
						borderRadius: '5px',
					}
				
				return (
					<div key={turn._id} style={{padding: '5px'}}>
						<Card size="small" title={users[turn.user].username} style={style}>
						{
							turn.wasPassed ? 
								<Typography.Text strong>Pass</Typography.Text> : 
							turn.wasSkipped ? 
								<Typography.Text strong>Skipped</Typography.Text> : 
							turn.cardsPlayed.map(card =>
								<Typography.Text code key={card._id}>{card.cardRank.character} {card.suit.character}</Typography.Text>
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
				let drinks;
				if (drink.type === 'drink given') {
					drinks = (
						<div style={{padding: '5px'}}>
							<Card size='small' title='Drink Given'>
								<Typography>{`From ${drink.from.username}`}</Typography>
								<Typography>{`To ${drink.to.username}`}</Typography>
							</Card>
						</div>
					)
				}
				else { // drink.type === 'drink drunk'
					drinks = (
						<div style={{padding: '5px'}}>
							<Card size='small' title='Drink Drunk'>
								{`By ${drink.user.username}`}
							</Card>
						</div>
					)
				}
				return drinks;
			});
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
				desc = `Started as ${player.politicalRank.name}`;
			}
			return desc;
		}
		
		let results = <List
			itemLayout="horizontal"
			dataSource={this.props.game.players}
			renderItem={player => (
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar>{player.user.username[0].toUpperCase()}</Avatar>}
						title={player.user.username}
						description={description(player)}
					/>
					<div>{player.nextGameRank.name}</div>
				</List.Item>
			)}
		/>

		return results;
	}
	
	toggleDrawer = () => {
		this.setState({drawerOpen: !this.state.drawerOpen});
	}

  render() {

    const { game } = this.props;
		const { playersHand } = game;

		
		let createdTime = new Date(this.props.game.createdAt).toLocaleString().replace(/:\d+ /, ' ');
		let startTime = new Date(this.props.game.startedAt).toLocaleString().replace(/:\d+ /, ' ');
		
    return (
      <Layout>

				<Modal
					title="Game Complete"
					visible={this.statusValue() === 'FINALIZED' && this.state.visible}
					onOk={this.handleOk}
					mask={true}
				>
					{this.statusValue() === 'FINALIZED' && this.state.visible ? this.gameOverResults() : null}
				</Modal>

        <Layout>

          <PageHeader 
						onBack={() => null} 
						title={`Presidents`}
						subTitle={this.props.game.name + ' - ' + this.props.username}
					/>
				          
					<Content style={{ margin: '0 16px' }}>

						<div style={{ padding: 20, background: '#fff' }}>
							<Steps current={stepNumber(this.statusValue())}>
								<Step title="Created" subTitle={createdTime}/>
								<Step title="Started" subTitle={startTime}/>
								<Step title="In Progress" 
									subTitle={
										<Moment 
											date={this.props.game.startedAt}
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
									<Button 
										onClick={() => this.start()} 
										icon='play-square'
										style={{margin: 10, color: 'white'}}
										type='primary'
									>
										Start
									</Button>
									: null
							}
							
							{
								this.statusValue() === 'FINALIZED' ? 
									<Button 
										onClick={() => this.props.rematch()} 
										icon='rollback' 
										shape='circle'
										style={{margin: 10}} 
										type='primary'
									>
										Rematch
									</Button>
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
									/> : null
							}

							</div>

							<div style={{marginTop:10, padding: 20, background: '#fff', display: 'flex'}}>

								<div style={{float:'left', width: '50%', padding: 10}}>
									<Typography.Title level={4}>
										Turns
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
							/>
            </div>

						{
							this.state.hoverAreaSettings.open ? 
								<HoverArea 
									username={this.props.username} 
									gameId={this.props.game._id} 
									settings={this.state.hoverAreaSettings}
								/> : null }

						<div style={{cursor: 'pointer', position: 'fixed', bottom: '10px', right: '16px' }}>
							<Tooltip placement='top' title='Chat'>
								<Button style={{marginLeft: 2}} icon="wechat" shape="circle" onClick={() => this.toggleHoverArea('chat')} />
							</Tooltip>
							<Tooltip placement='top' title='Video Chat'>
								<Button style={{marginLeft: 2}} icon="video-camera" shape="circle" onClick={() => this.getVideoToken()} />
							</Tooltip>
							<Tooltip placement='top' title='YouTube'>
								<Button style={{marginLeft: 2}} icon="youtube" shape="circle" onClick={() => this.toggleHoverArea('youtube')} />
							</Tooltip>
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
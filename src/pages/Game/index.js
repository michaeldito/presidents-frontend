import React from 'react';
import 'antd/dist/antd.css';
import axios from '../../config/axios';
import { Layout, Modal, PageHeader, Typography, List, Avatar, Card, Steps } from 'antd';
import { HoverArea, Chat, YouTubePlayer } from '../../components';
import { HoverButtons, HoverButton, PlayerArea, Flex, PullLeft, PullRight, 
	Title, HorizontallyScrollable, VerticalDivider, GameButton, Container, StepsArea } from './components';
import Players from './Players';
import PlayersHand from './PlayersHand';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { playCards, pass, giveDrink, drinkDrink, startGame, updateGame, rematch } from './actions';
import Moment from 'react-moment';
const { Content } = Layout;
const { Step } = Steps;


const stepNumber = value => {
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
						display: 'flex',
						flexDirection: 'column'
					} : {
						textAlign: 'center',
						borderRadius: '5px',
						display: 'flex',
						flexDirection: 'column'
					}
				
				return (
					<div key={turn._id} style={{padding: '5px'}}>
						<Card size="small" title={users[turn.user].username} style={style}>
						{
							turn.wasPassed ? 
								<Typography.Text strong>
									Pass
								</Typography.Text> : 
							turn.wasSkipped ? 
								<Typography.Text strong>
									Skipped
								</Typography.Text> : 
							turn.cardsPlayed.map(card =>
								<Typography.Text style={{display:'flex', margin: 2}} code key={card._id}>
									{card.cardRank.character} {card.suit.character}
								</Typography.Text>
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
			return this.props.game.drinks.reverse().map((drink, idx) => {
				let drinks;
				if (drink.type === 'drink given') {
					drinks = (
						<div key={idx} style={{padding: '5px'}}>
							<Card size='small' title='Drink Given'>
								<Typography>{`From ${drink.from.username}`}</Typography>
								<Typography>{`To ${drink.to.username}`}</Typography>
							</Card>
						</div>
					)
				}
				else { // drink.type === 'drink drunk'
					drinks = (
						<div key={idx} style={{padding: '5px'}}>
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
		const description = ({ politicalRank }) => {
			return politicalRank === undefined ?
				`Started as nothing`
				: politicalRank.name === 'Asshole' ?
					`Sharted from the bottom`
					: `Started as ${politicalRank.name}`;
		}
		
		let results = (
			<List
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
		);

		return results;
	}

  render() {

    const { game } = this.props;
		const { playersHand } = game;
		
		let createdTime = new Date(this.props.game.createdAt).toLocaleString().replace(/:\d+ /, ' ');
		let startTime = new Date(this.props.game.startedAt).toLocaleString().replace(/:\d+ /, ' ');
		
		const GameOverModal = () =>
			<Modal
				title="Game Complete"
				visible={this.statusValue() === 'FINALIZED' && this.state.visible}
				onOk={this.handleOk}
				mask={true}
			>
				{this.statusValue() === 'FINALIZED' && this.state.visible ? this.gameOverResults() : null}
			</Modal>

		const GamePageHeader = () =>
			<PageHeader 
				onBack={() => null} 
				title={`Presidents`}
				subTitle={this.props.game.name + ' - ' + this.props.username}
			/>

		const GameProgress = () => 
			<StepsArea>
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
			</StepsArea>

		const ActionButtons = () =>
			<Container>
				<Title value='Actions' />
				{
					this.statusValue() === 'NOT_STARTED' ? 
						<GameButton title='Start' action={this.props.startGame} icon='rollback' />
						: null
				}
				{
					this.statusValue() === 'FINALIZED' ?
						<GameButton title='Rematch' action={this.props.rematch} icon='rollback' />
						: null
				}
				<GameButton title='Button' onClick={null} icon='rollback' />
			</Container>

		const YourHand = () =>
			<Container>
				<Title value='Your Hand' />
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
			</Container>

		const TurnsAndDrinks = () =>
			<Container>
				<Flex>
					<PullLeft>
						<Title value='Turns' />
						<HorizontallyScrollable>
							{this.turnsTaken()}
						</HorizontallyScrollable>
					</PullLeft>
					<VerticalDivider />
					<PullRight>
						<Title value='Drinks' />
							<HorizontallyScrollable>
								{this.drinks()}
							</HorizontallyScrollable>
					</PullRight>
				</Flex>
			</Container>

		let Larrys = () =>
			<PlayerArea>
				<Title value='Larrys' />
				<Players
					game={game} 
					giveDrink={this.props.giveDrink} 
					roomName={game._id}
					token={this.state.token}
				/>
			</PlayerArea>

		const Hover = () =>
			<React.Fragment>
				{
						this.state.hoverAreaSettings.open ? 
							<HoverArea 
								username={this.props.username} 
								gameId={this.props.game._id} 
								settings={this.state.hoverAreaSettings}
							>
								{
									this.state.hoverAreaSettings.type === 'youtube' ?
										<YouTubePlayer /> :
										<Chat username={this.props.username} gameId={this.props.game._id}/>
								}
							</HoverArea> : null
					}
			</React.Fragment>

		const HoverActionButtons = () =>
			<HoverButtons>
				<HoverButton title='Chat' icon='wechat' onClick={() => this.toggleHoverArea('chat')} />
				<HoverButton title='Video Chat' icon='video-camera' onClick={() => this.getVideoToken()} />
				<HoverButton title='YouTube' icon='youtube' onClick={() => this.toggleHoverArea('youtube')} />
			</HoverButtons>

    return (
      <Layout>
				<GameOverModal />
        <Layout>
          <GamePageHeader />
					<Content>
						<GameProgress />
						<ActionButtons />
						<YourHand />
						<TurnsAndDrinks />
						<Larrys />
						<Hover />
						<HoverActionButtons />
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
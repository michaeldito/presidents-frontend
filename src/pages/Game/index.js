
import React from 'react';
import socket from 'socket.io-client'
import 'antd/dist/antd.css';
import { Layout, PageHeader, Typography, Button } from 'antd';
import { PlayersHand, CardBoard, Sidebar } from '../../components';
import { GameArea } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { playCards, pass, giveDrink, drinkDrink, startGame, updateGame } from '../../actions';

const { Content } = Layout;

// const io = socket('http://localhost:8080');

class Game extends React.Component {
	constructor(props) {
		super(props);

		// io.on('connect', () => {
		// 	console.log('[GameSocket] connected');
		// });

		// io.on('disconnect', () => {
		// 	console.log('[GameSocket] disconnected');
		// });


	}

	// componentWillReceiveProps(props) {

	// 	io.on('error', data => {
	// 		console.log(`[GameSocket] error`);
	// 		console.log(data.error);
	// 	});

	// 	io.on('game refresh', data => {
	// 		const { updateGame, game } = props;
	// 		console.log('[GameSocket] game refresh');
	// 		console.dir(data);
	// 		updateGame(game);
	// 	});

	// 	io.on('drink given', data => {
	// 		const { updateGame, game } = props;
	// 		console.log('[GameSocket] drink given');
	// 		console.dir(data);
	// 		updateGame(game);
	// 	});

	// 	io.on('drink drunk', data => {
	// 		const { updateGame, game } = props;
	// 		console.log('[GameSocket] drink dunk');
	// 		console.dir(data);
	// 		updateGame(game);
	// 	});

	// 	io.on('rematch started', data => {
	// 		const { updateGame, game } = props;
	// 		console.log('[GameSocket] rematch started');
	// 		console.dir(data);
	// 		updateGame(game);
	// 	});

	// }

	submit = () => {
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
  render() {

    const { game } = this.props;
		const { playersHand, cardsRemaining } = game;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <PageHeader onBack={() => null} title='Presidents' subTitle={`${this.name()} - ${this.statusValue()}`}>
					{
						this.statusValue() === 'NOT_STARTED' ? 
						<Button onClick={() => this.submit()} size='large' style={{margin: 10, color: 'white', backgroundColor: '#52c41a'}} type=''>Start</Button>
						: null
					}
					</PageHeader>
          <Content style={{ margin: '0 16px' }}>

						<div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff', minHeight: 180 }}>

							<Typography.Title level={4}>Your Hand</Typography.Title>
							<PlayersHand cards={playersHand} gameId={game._id} playCards={this.props.playCards}/>

						<div style={{ minHeight: 10 }} />
							<Typography.Title level={4}>Cards Remaining</Typography.Title>
							<CardBoard cards={cardsRemaining}/>
						</div>

            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff'}}>
              <GameArea game={game} />
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
		updateGame
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Game);
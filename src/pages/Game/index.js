
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Layout, PageHeader, Typography, Button } from 'antd';
import { PlayersHand, CardBoard, Sidebar } from '../../components';
import { GameArea } from './components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { playCards, pass, giveDrink, drinkDrink, startGame } from '../../actions';

const { Content } = Layout;

class Game extends React.Component {
	submit = () => {
		let id = this.props.game._id;
		this.props.startGame(id);
	}

	statusValue = () => {
		let status = '';
		if (this.props.game.status !== undefined) {
			status = this.props.game.status;
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
		const { playersHand, cardBoardCards } = game;

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
							<CardBoard cards={cardBoardCards}/>
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
		startGame
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Game);
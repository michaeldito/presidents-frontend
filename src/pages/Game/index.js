
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Modal, PageHeader, Typography, Button, Tag, Switch, Divider } from 'antd';
import { PlayersHand, CardBoard, Sidebar } from '../../components';
import { GameArea } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { playCards, pass, giveDrink, drinkDrink, startGame, updateGame } from '../../actions';

const { Content } = Layout;

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
			showCardsRemaining: true
		}
	}

	toggleCardsRemaining = () => {
		this.setState({showCardsRemaining: !this.state.showCardsRemaining});
	}

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

	handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
	};
	
  render() {

    const { game } = this.props;
		const { playersHand, cardsRemaining } = game;

		let color = calculateColor(this.statusValue());

    return (
      <Layout style={{ minHeight: '100vh' }}>

			<Modal
          title="Basic Modal"
          visible={this.statusValue() === 'FINALIZED' && this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
					cancelText='Rematch?'
        >
				<p>Game over</p>
			</Modal>

        <Sidebar />

        <Layout>
          <PageHeader 
						onBack={() => null} 
						title={`Presidents - ${this.name()}`}
						subTitle={
							<Tag color={color} key={this.statusValue()}>
								{this.statusValue().toUpperCase()}
							</Tag>
						}
					>
					{
						this.statusValue() === 'NOT_STARTED' ? 
						<Button onClick={() => this.submit()} size='large' style={{margin: 10, color: 'white', backgroundColor: '#a0d911'}} type=''>Start</Button>
						: null
					}
					</PageHeader>
          <Content style={{ margin: '0 16px' }}>

						<div style={{ padding: 20, background: '#fff' }}>

							<Typography.Title level={4}>Your Hand</Typography.Title>
							<PlayersHand 
								cards={playersHand} 
								gameId={game._id} 
								playCards={this.props.playCards} 
								pass={this.props.pass}
								drinkDrink={this.props.drinkDrink}
								/>

							<Divider />

							<div style={{marginTop:10}}> 
								<Typography.Title level={4}>
									Cards Remaining 
									<Switch style={{marginLeft:10}} size="small" checked={this.state.showCardsRemaining} onClick={() => this.toggleCardsRemaining()}/>
								</Typography.Title>

								{
									this.state.showCardsRemaining ? <CardBoard cards={cardsRemaining}/> : <div></div>
								}
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
		updateGame
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Game);
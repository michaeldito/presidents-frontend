import { io } from './index';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { updateGame } from '../actions';

class GameSocket extends Component {
  constructor(props) {
    super(props);

    io.on('connect', () => {
      console.log('[GameSocket] connected');
    });

    io.on('disconnect', () => {
      console.log('[GameSocket] disconnected');
    });

    io.on('UPDATE_GAME', data => {
      console.log(`[GameSocket] on UPDATE_GAME`);
      this.props.updateGame(data);
    });

  }
  
  render() {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateGame
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameSocket);


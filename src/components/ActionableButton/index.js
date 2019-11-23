
import React from 'react';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { joinGame, getGame } from '../../actions';

import { Button } from 'antd';

class ActionableButton extends React.Component {

  render() {

    let {name, id, payload} = this.props;
    let button = name === 'Join' ? 
      <Button onClick={() => this.props.joinGame(id, payload)}>
          {name}
      </Button> 
      : name === 'Go' ? 
        <Button onClick={() => this.props.getGame(id)}>
          {name}
        </Button>
      : <div></div>

    return button;
  }
}


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    joinGame,
    getGame
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActionableButton);
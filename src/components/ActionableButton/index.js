
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
    let button = name === 'join' ? 
      <Button onClick={() => this.props.joinGame(id, payload)}>
        <Link to='/game'>
          {name}
        </Link>
      </Button> 
      : 
      <Link to='/game'>
        <Button onClick={() => this.props.getGame(id)}>
          {name}
        </Button>
      </Link>

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
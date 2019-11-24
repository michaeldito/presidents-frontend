
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
    let action = name === 'Join' ? 
      () => this.props.joinGame(id, payload)
      :
      () => this.props.getGame(id);
    
    return (
      <Link to='/game'>

        <Button onClick={() => action()}>
          {name}
        </Button> 

      </Link>

    )
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

import React from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Layout,
  PageHeader,
  Dropdown,
  Menu,
  Typography,
  Row, Col
} from 'antd';
import {SearchTable} from '../../components';

import {getGamesToJoin} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class Search extends React.Component {
  render() {
    return (
      <Layout>
        <PageHeader onBack={() => null} title="Search" />
        <SearchTable data={this.props.data} alreadyJoinedGames={this.props.user.gamesPlayed}/>
      </Layout>
    );
  }
}


function mapStateToProps(state) {
	return {
    user: state.user,
    data: state.game.allGameData
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getGamesToJoin
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Search);
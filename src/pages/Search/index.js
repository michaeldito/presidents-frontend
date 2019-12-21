
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, PageHeader } from 'antd';
import { SearchTable } from './components';
import { joinGame, getGame } from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


const Search = ({user, data, joinGame, getGame}) => {
  return (
    <Layout>
      <PageHeader onBack={() => null} title="Search" />
      <SearchTable 
        data={data} 
        alreadyJoinedGames={user.gamesPlayed}
        joinGame={joinGame}
        getGame={getGame}
      />
    </Layout>
  );
}


function mapStateToProps(state) {
	return {
    user: state.user,
    data: state.game.allGameData
  };
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
)(Search);
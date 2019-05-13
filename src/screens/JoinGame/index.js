
import React, { Component } from 'react';
import { NavButton, Container, Text, Wrapper, PageHeading } from '../../components/general';
import { GameLink } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { dispatchJoinGameEvent } from '../../socket/sender'; 

class JoinGame extends Component {
  render() {
    const { gamesToJoin, username } = this.props;
    const gameNamesList = gamesToJoin.map(gamename => 
      <GameLink 
        key={gamename} 
        name={gamename}        
        joinGame={() => dispatchJoinGameEvent(username, gamename)} 
      />)

    return (
      <React.Fragment>

        <Container>
          <NavButton to='/'>
            Go Back
          </NavButton>
        </Container>

        <PageHeading>
          <Text>Join Game</Text>
        </PageHeading>

        <Container>
          <Wrapper>
            {gameNamesList}
          </Wrapper>
        </Container>

      </React.Fragment>
    )
  }
}


function mapStateToProps(state) {
	return {
    username: state.user.username,
    gamesToJoin: state.game.gamesToJoin
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(JoinGame);


import React, { Component } from 'react';
import { Header, WelcomeWrapper } from './components';
import { NavButton, Container, Wrapper } from '../../components/general';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getGamesToJoin } from '../../actions';

class Welcome extends Component {
  getGamesList = event => {
    event.preventDefault();
    this.props.getGamesToJoin();
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Header>Presidents</Header>
        </Container>
        <WelcomeWrapper>
          <Wrapper>
            <NavButton to={'/login'}>Login</NavButton>
            <NavButton to={'/create-account'}>Create Account</NavButton>
            <NavButton to={'/create-game'}>Create Game</NavButton>
            <div onClick={this.getGamesList}>
              <NavButton to={'/join-game'}>Join Game</NavButton>
            </div>
          </Wrapper>
        </WelcomeWrapper>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getGamesToJoin
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Welcome);

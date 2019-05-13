
import React, { Component } from 'react';
import { NavButton, Container, PageHeading, Text } from '../../components/general';
import { Input, Wrapper, StatCheckBoxWrapper } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { createGame } from '../../actions';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  createGame = (event) => {
    const { name } = this.state;
    event.preventDefault();
    this.props.createGame({name, createdBy: this.props.username});
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // update the state key corresponding to the given input name
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <React.Fragment>

        <Container>
          <NavButton to='/'>
            GO BACK
          </NavButton>
        </Container>

        <PageHeading>
          <Text>Create Game</Text>
        </PageHeading>

        <Container>
          <Wrapper>
            <Input placeholder='name' name='name' onChange={this.handleInputChange} />
            {/* <Input placeholder='# decks' name='numDecks' onChange={this.handleInputChange} /> */}
            <StatCheckBoxWrapper>
              {/* <Checkbox name='showStats' checked={this.state.showStats} onChange={this.handleInputChange} /> */}
              {/* <Message>stats?</Message> */}
            </StatCheckBoxWrapper>
          </Wrapper>
        </Container>
        <Container>
          <div onClick={this.createGame}>
            <NavButton to='/game' color={'black'}>SUBMIT</NavButton>
          </div>
        </Container>

      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
	return {
    username: state.user.username
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createGame
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreateGame);

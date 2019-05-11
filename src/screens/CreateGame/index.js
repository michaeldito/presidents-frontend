
import React, { Component } from 'react';
import { NavButton, Container, PageHeading, Text } from '../../components/general';
import { Input, Wrapper, Checkbox, Message, StatCheckBoxWrapper } from './components';

export default class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numDecks: 1,
      showStats: false
    }
  }

  createGame = (event) => {
    const { name, numDecks, showStats } = this.state;
    event.preventDefault();
    console.log(`${name}-${numDecks}-${showStats}`);
  }

  handleInputChange = event => {
    console.log('handlin change')
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
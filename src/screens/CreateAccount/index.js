
import React, { Component } from 'react';
import { NavButton, Container, PageHeading, Text } from '../../components/general';
import { Input, Wrapper } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { createAccount } from '../../actions';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  createAccount = event => {
    const { username, password } = this.state;
    console.log(`createAccount ${username} ${password}`);
    this.props.createAccount({ username, password });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
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
          <Text>Create Account</Text>
        </PageHeading>

        <Container>
          <Wrapper>
            <form autoComplete='off'>
              <Input placeholder='username' name='username' onChange={this.handleInputChange} />
              <Input autoComplete='off' placeholder='password' name='password' onChange={this.handleInputChange} type='password' />
            </form>
          </Wrapper>
        </Container>
        <Container>
          <div onClick={this.createAccount}>
            <NavButton to='/' color={'blue'}>CREATE</NavButton>
          </div>
        </Container>

      </React.Fragment>
    )
  }
}


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createAccount
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreateAccount);

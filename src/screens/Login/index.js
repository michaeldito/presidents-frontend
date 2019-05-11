
import React, { Component } from 'react';
import { NavButton, Container, PageHeading, Text } from '../../components/general';
import { Input, Wrapper } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { loginUser } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
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
    const { loginUser } = this.props;
    const { username, password } = this.state;
    return (
      <React.Fragment>

        <Container>
          <NavButton to='/'>
            GO BACK
          </NavButton>
        </Container>

        <PageHeading>
          <Text>Login</Text>
        </PageHeading>

        <Container>
          <Wrapper>
            <Input placeholder='username' name='username' onChange={this.handleInputChange} />
            <Input placeholder='password' name='password' onChange={this.handleInputChange} type='password' />
          </Wrapper>
        </Container>
        <Container>
          <div onClick={() => loginUser({username, password})}>
            <NavButton to='/' color={'blue'}>Login</NavButton>
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
		loginUser
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);

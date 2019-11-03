
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
  Icon,
  Row, Col
} from 'antd';
import Sidebar from '../../components/Sidebar';

import {createGame} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { Redirect} from 'react-router-dom';

const { Content } = Layout;

const configs = [
  {name: 'Presidents'},
];

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      gameType: '',
      name: '',
      redirected: false
    };
  }
  
  handleChange(event) {
    console.log('handling dat change')
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { gameType, name } = this.state;
    console.log({ gameType, name } )
    this.props.createGame({
      name,
      gameType,
      createdBy: this.props.user._id
    });
  };

  redirect = () => {
    if (this.props.wasGameCreated) {
      this.setState({redirected: true});
      return <Redirect to={`/game`}/>;
    }
    return null;
  }

  render() {

    const menu = (
      <Menu>
        {configs.map((config, idx) =>
          <Menu.Item key={idx} onClick={() => this.setState({gameType: config.name})}>
            {config.name}
          </Menu.Item>
        )}
      </Menu>
    );

    // let redirect = this.props.wasGameCreated && ! this.state.redirected ? this.redirect() : null;


    return (      
      <Layout>

        {/* {redirect} */}

        <Sidebar />

        <Content>

          <PageHeader onBack={() => null} title="Create Game" />

          <Layout>

            <Layout.Content style={{marginLeft:10}} > 

                <Form layout='inline' onSubmit={this.handleSubmit}>

                  <Form.Item>
                    <Dropdown overlay={menu}>
                        <Button>
                          {this.state.gameType !== '' ? this.state.gameType : 'Select Type'}
                        </Button>
                    </Dropdown>
                  </Form.Item>

                  <Form.Item>
                    <Form.Item>
                      <Input name='name' placeholder='Enter Name' onChange={(c) => this.handleChange(c)} />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{margin: 'auto'}}>
                      Create
                    </Button>
                  </Form.Item>

                </Form>

            </Layout.Content>

          </Layout>


        </Content>

      </Layout>
    );
  }
}

let CreateGameComponent = Form.create({ name: 'search' })(CreateGame);

function mapStateToProps(state) {
	return {
    user: state.user,
    wasGameCreated: state.game.wasGameCreated
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
)(CreateGameComponent);
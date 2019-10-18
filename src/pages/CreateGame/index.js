
import React from 'react';
import PropTypes from 'prop-types';
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
    console.log(event.target.name)
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    function handleMenuClick(e) {
      console.log('click', e);
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
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

            <Row>

            <Col span={4}>

              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item label="type">
                  <Dropdown overlay={menu}>
                      <Button style={{width: '100%'}}>
                        {this.state.gameType}
                        <Icon type="down" />
                      </Button>
                  </Dropdown>
                </Form.Item>

                <Form.Item label="name">
                  <Form.Item>
                    <Input name='name' onChange={(c) => this.handleChange(c)} />
                  </Form.Item>
                </Form.Item>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button type="primary" htmlType="submit" style={{margin: 'auto'}}>
                    Create
                  </Button>
                </div>


              </Form>

              </Col>

            </Row>

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
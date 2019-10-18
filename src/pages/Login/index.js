
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { login } from '../../actions';

import { Form, Icon, Input, Button, Layout, Card, PageHeader } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';

class NormalLoginForm extends React.Component {
  constructor() {
    super();
    this.state= {
      username: '',
      password: ''
    };
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    //this.props.form.validateFields((err, values) => {
    //  if (!err) {
    //    console.log('Received values of form: ', values);
        this.props.login('mike', 'dito');
    //  }
    //});
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>

          {this.props.user.loggedIn ? <Redirect to={`/dashboard`}/> : null}
        

          <PageHeader title="Log In" />

          <div style={{margin:'auto'}}>

            <Card size='large' >

              <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username.' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Username"
                      onChange={(c) => this.handleChange(c)}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password.' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                      onChange={(c) => this.handleChange(c)}
                    />,
                  )}
                </Form.Item>

                <Form.Item>

                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log In
                  </Button>

                  <NavLink
                    key={`/register`}
                    to={`/register`}
                  >
                    Or Register
                  </NavLink>

                </Form.Item>

              </Form>

            </Card>
            
          </div>

        </Layout>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

function mapStateToProps(state) {
	return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		login
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);
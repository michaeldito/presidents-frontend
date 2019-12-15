
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { register } from '../../actions';

import { Form, Icon, Input, Button, Layout, Card, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


let RegisterForm = props => {

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        props.register(values);
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Layout style={{backgroundColor: '#001529'}}>        

      {props.user.registered ? <Redirect to={`/dashboard`}/> : null}

      <div style={{margin: 'auto', textAlign:'center'}}>
        <Card size='large' >

          <Typography.Title level={3}>Register</Typography.Title>

          <Form onSubmit={handleSubmit} className="login-form">

            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username.' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="username"
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email.' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="email"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password.' }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('verify', {
                rules: [{ 
                  required: true, message: 'Please input your verify password.'
                }, {
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = props.form;
                    let password = getFieldValue('password');
                    let verify = getFieldValue('verify');
                    console.log('password');
                    console.log(password);
                    console.log('verify')
                    console.log(verify)
                    password !== verify ? callback('Your passwords do not match, please try again.') : callback();
                  }
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="password"
                />
              )}
            </Form.Item>

            <Form.Item>

              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>

              <NavLink
                key={`/login`}
                to={`/login`}
              >
                Or Login
              </NavLink>

            </Form.Item>

          </Form>
          
        </Card>
      </div>
    </Layout>
  );
}

RegisterForm = Form.create({ name: 'normal_login' })(RegisterForm);

function mapStateToProps(state) {
	return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		register
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RegisterForm);

import React from 'react';
import 'antd/dist/antd.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { login } from './actions';

import { Form, Icon, Input, Button, Layout, Card, Typography } from 'antd';
import { NavLink } from 'react-router-dom';

let Login = props => {

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
     if (!err) {
        props.login(values.username, values.password);
     }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Layout style={{backgroundColor: '#001529'}}>        
      <div style={{margin: 'auto', textAlign:'center'}}>
        <Card size='large' >
          <Typography.Title level={3}>Log In</Typography.Title>
          <Form onSubmit={handleSubmit} style={{maxWidth: 300}}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username.' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
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
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
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


Login = Form.create({ name: 'normal_login' })(Login);

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
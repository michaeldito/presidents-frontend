
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { register } from '../../actions';

import { Form, Icon, Input, Button, Layout, Card, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';

const { Header } = Layout;

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state= {
      username: '',
      email: '',
      password: '',
      verify: ''
    };
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.register(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>

          {this.props.user.registered ? <Redirect to={`/dashboard`}/> : null}

        
          <Header>Header</Header>

          <PageHeader onBack={() => null} title="Register" />

          <div style={{margin:'auto'}}>

            <Card size='large' >

              <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username.' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="username"
                      onChange={(c) => this.handleChange(c)}
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
                      onChange={(c) => this.handleChange(c)}
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password.' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="password"
                      onChange={(c) => this.handleChange(c)}
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('verify', {
                    rules: [{ required: true, message: 'Please input your verify password.' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="password"
                      onChange={(c) => this.handleChange(c)}
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    {/* 
                    
                    if (registration is successful)
                      clear state
                      <Redirect to={`/game`} />
                      
                    else
                      notifications.error()
                    
                    */}
                    Register
                  </Button>
                </Form.Item>

              </Form>
              
            </Card>
            
          </div>


        </Layout>
    );
  }
}

const AntForm = Form.create({ name: 'normal_login' })(RegisterForm);

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
)(AntForm);
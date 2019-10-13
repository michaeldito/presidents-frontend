
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox, Layout, Card, PageHeader } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header } = Layout;

class RegisterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        
          <Header>Header</Header>

          <PageHeader onBack={() => null} title="Register" />

          <div style={{margin:'auto'}}>
            <Card size='large' >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="username"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="email"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="password"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('verify password', {
                    rules: [{ required: true, message: 'Please input your verify password!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="password"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    <NavLink
                      key={`/game`}
                      to={`/game`}
                    >
                      Submit
                    </NavLink>
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

        </Layout>
    );
  }
}

export default Form.create({ name: 'normal_login' })(RegisterForm);
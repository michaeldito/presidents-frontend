
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
  Card,
  Typography,
} from 'antd';
import {SearchTable} from '../../components';

import {NavLink} from 'react-router-dom';

const { Header, Sider, Content } = Layout;

class Search extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

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
        <Menu.Item key="1">
          <Icon type="user" />
          Presidents
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          War
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          Go Fish
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>

        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item key="0">
            <Icon type="dashboard" />
            <span>
              <NavLink
                key={`/dashboard`}
                to={`/dashboard`}
              >
              Home
              </NavLink>
            </span>
          </Menu.Item>

          <Menu.Item key="1">
            <Icon type="play-circle" />
            <span>
              <NavLink
                key={`/game`}
                to={`/game`}
              >
                Game Name
              </NavLink>
            </span>
          </Menu.Item>

          <Menu.Item key="2">
            <Icon type="plus-circle" />
            <span>
              <NavLink
                  key={`/create-game`}
                  to={`/create-game`}
              >
                New
              </NavLink>
            </span>
          </Menu.Item>

          <Menu.Item key="7">
            <Icon type="message" />
            <span>
              <NavLink
                  key={`/inbox`}
                  to={`/inbox`}
              >
                Inbox
              </NavLink>
            </span>
          </Menu.Item>

          <Menu.Item key="12">
            <Icon type="team" />
            <span>
              <NavLink
                key={`/friends`}
                to={`/friends`}
              >
                Friends
              </NavLink>
            </span>
          </Menu.Item>

          <Menu.Item key="13">
            <Icon type="search" />
            <span>
              <NavLink
                key={`/search`}
                to={`/search`}
              >
                Search
              </NavLink>
            </span>
          </Menu.Item>

          <Menu.Item key="9">
            <Icon type="profile" />
            <span>
              <NavLink
                key={`/create-game`}
                to={`/create-game`}>
                  Profile
              </NavLink>
            </span>
          </Menu.Item>

        </Menu>

        </Sider>


        <Content>

          <PageHeader onBack={() => null} title="Search" />

          <Layout style={{float: 'left'}}>

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <Form.Item label="type">
                <Dropdown overlay={menu}>
                  <Button style={{width: '100%'}}>
                    Game Type
                    <Icon type="down" />
                  </Button>
                </Dropdown>
              </Form.Item>

              <Form.Item label="name">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      type: 'name',
                      message: 'name is required!',
                    }
                  ],
                })(<Input />)}
              </Form.Item>

            </Form>


          </Layout>

          <SearchTable />

        </Content>



      </Layout>
    );
  }
}

export default Form.create({ name: 'search' })(Search);
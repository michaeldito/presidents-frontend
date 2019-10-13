
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, PageHeader } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Profile extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
      
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
                  key={`/profile`}
                  to={`/profile`}>
                    Profile
                </NavLink>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Layout>

          <PageHeader onBack={() => null} title="Profile"/>
          
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff', minHeight: 180 }}>Profile</div>
          
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Larry Prez ©2019 Created by MD</Footer>
        
        </Layout>

      </Layout>
    );
  }
}
          
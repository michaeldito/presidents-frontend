
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SideBar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout >
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="0">
          <Icon type="dashboard" />
              <span>
                <NavLink
                  key={`/`}
                  to={`/`}
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
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="team" />
                  <span>
                    {/* <NavLink
                        key={`/create-game`}
                        to={`/create-game`}
                    > */}
                      Friends
                    {/* </NavLink> */}
                  </span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="database" />
                  <span>
                    <NavLink
                      key={`/create-game`}
                      to={`/create-game`}>
                        Games
                    </NavLink>
                  </span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
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
      </Layout>
    );
  }
}
          
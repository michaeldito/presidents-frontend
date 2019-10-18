
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;


// TODO:
// convert to function
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
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item key="0">
            <Icon type="login" />
            <span>
              <NavLink
                key={`/login`}
                to={`/login`}
              >
              Login
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
    );
  }
}
          
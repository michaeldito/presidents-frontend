
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import {getGamesToJoin, logout} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
const { Sider } = Layout;


// TODO:
// convert to function
// create file with {menu items}
// import and map over array to create menu items
class SideBar extends React.Component {
  state = {
    collapsed: true,
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
            <NavLink
              key={`/dashboard`}
              to={`/dashboard`}
            >
              <Icon type="home" />
              <span>
                Home
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="1">
            <NavLink
              key={`/game`}
              to={`/game`}
            >
            <Icon type="play-circle" />
            <span>
              Game Name
            </span>
            </NavLink>

          </Menu.Item>

          <Menu.Item key="2">
            <NavLink
              key={`/create-game`}
              to={`/create-game`}
            >
            <Icon type="plus-circle" />
            <span>
                New
            </span>
            </NavLink>

          </Menu.Item>

          <Menu.Item key="7">
            <NavLink
              key={`/inbox`}
              to={`/inbox`}
            >
            <Icon type="message" />
            <span>
               Inbox
            </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="12">
            <NavLink
              key={`/friends`}
              to={`/friends`}
            >
              <Icon type="team" />
              <span>
                Friends
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="13">
            <NavLink
              key={`/search`}
              to={`/search`}
              onClick={() => this.props.getGamesToJoin()}
            >
              <Icon type="search" />
              <span>
                Search
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="9">
            <NavLink
              key={`/profile`}
              to={`/profile`}
            >
              <Icon type="profile" />
              <span>
                Profile
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="10" onClick={() => this.props.logout()}>
            <NavLink
              key={`/`}
              to={`/`}
            >
              <Icon type="logout" />
              <span>
                Logout
              </span>
            </NavLink>
          </Menu.Item>

        </Menu>

      </Sider>
    );
  }
}
          
function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    getGamesToJoin,
    logout
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SideBar);
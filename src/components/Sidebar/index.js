import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { getGamesToJoin, logout, getSchemas, getConfigNames } from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const { Sider } = Layout;

const Link = ({ destination, icon, text }) => (
  <NavLink key={`/${destination}`} to={`/${destination}`}>
    <Icon type={icon} />
    <span>{text}</span>
  </NavLink>
);

const SideBar = ({ getGamesToJoin, logout, getSchemas, getConfigNames }) => {
  let [collapsed, setCollapsed] = useState(true);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
        <Menu.Item key="0">
          <Link destination="dashboard" icon="dashboard" text="Dashboard" />
        </Menu.Item>

        <Menu.Item key="1">
          <Link destination="game" icon="play-circle" text="Game" />
        </Menu.Item>

        <Menu.Item key="2" onClick={() => getConfigNames()}>
          <Link destination="create-game" icon="plus-circle" text="Create" />
        </Menu.Item>

        <Menu.Item key="3" onClick={() => getGamesToJoin()}>
          <Link destination="search" icon="search" text="Search" />
        </Menu.Item>

        <Menu.Item key="4" onClick={() => getSchemas()}>
          <Link destination="admin" icon="safety" text="Admin" />
        </Menu.Item>

        <Menu.Item key="5" onClick={() => logout()}>
          <Link destination="" icon="logout" text="Logout" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getGamesToJoin,
      logout,
      getSchemas,
      getConfigNames
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

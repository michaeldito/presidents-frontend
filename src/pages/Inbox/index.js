
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Card, Typography, Icon, PageHeader, Button, Tag, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

          
const items = [
  { sentBy: 'me', status: { value: 'NOT_STARTED'}, game: { name: 'idk'} },
  { sentBy: 'you', status: { value: 'IN_PROGRESS'}, game: { name: 'idk2'} },
  { sentBy: 'someone', status: { value: 'NOT_STARTED'}, game: { name: 'idk4'} },
  { sentBy: 'them', status: { value: 'FINALIZED'}, game: { name: 'idk5'} },
  { sentBy: 'us', status: { value: 'NOT_STARTED'}, game: { name: 'idk6'} }
]

export default class Inbox extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    let inboxItems = items.map((item, idx) => 
      <Card key={idx} >

        <Row>

          <Col span={6}>
            <Row>
            
              <Col span={12}>
                <Typography.Text strong>Sent By:</Typography.Text>
              </Col>

              <Col span={12}>
                <Tag> {item.sentBy}</Tag>
              </Col>

            </Row>
          </Col>

          <Col span={6}>
            <Row>
            
              <Col span={12}>
                <Typography.Text strong>Status:</Typography.Text>
              </Col>

              <Col span={12}>
                <Tag color='cyan'>{item.status.value}</Tag>
              </Col>

            </Row>
          </Col>

          <Col span={6}>
            <Row>
            
              <Col span={6}>
                <Button>JOIN</Button>
              </Col>

              <Col span={6}>
                <Button>GO</Button>
              </Col>

            </Row>
          </Col>

        
        </Row>

      </Card>
    );

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

          <PageHeader onBack={() => null} title="Inbox"/>

          {inboxItems}

        </Layout>
      </Layout>
    );
  }
}
          

import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Button, Card } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class LandingPage extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>

        <Header>Header</Header>

        <div style={{margin:'auto'}}>
          <Card 
            size='large' 
            title={<Button style={{width:'300px'}}>
              <NavLink
                  key={`/login`}
                  to={`/login`}
              >
                Log In
              </NavLink>
            </Button>}
          >

            <Button style={{width:'300px'}}>
              <NavLink
                  key={`/register`}
                  to={`/register`}
              >
                Register
              </NavLink>
            </Button>

          </Card>

        </div>

      </Layout>
    );
  }
}
          
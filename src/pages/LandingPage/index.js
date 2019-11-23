
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button, Card } from 'antd';
import { NavLink } from 'react-router-dom';


export default class LandingPage extends React.Component {
  render() {
    return (
      <Layout>

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
          
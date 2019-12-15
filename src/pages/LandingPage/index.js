
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button, Card, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import Typing from 'react-typing-animation';

const LandingPage = () => {

  let login = (
    <div style={{textAlign:'center'}}>
      <Typing speed={500} loop={true} hideCursor={true}>
          <Typography.Title>LARRY PRESIDENTS</Typography.Title>
          <Typing.Reset />
        </Typing>
      <Button style={{width:'300px'}}>
        <NavLink
            key={`/login`}
            to={`/login`}
        >
          Log In
        </NavLink>
      </Button>
    </div>
  );

  let register = (
    <div style={{textAlign:'center'}}>
      <Button style={{width:'300px'}}>
        <NavLink
            key={`/register`}
            to={`/register`}
        >
          Register
        </NavLink>
      </Button>
    </div>
  )

  return (
    <Layout style={{backgroundColor: '#001529'}}>
      <div style={{margin:'auto'}}>
        <Card 
          size='large' 
          title={login}
        >
          {register}
        </Card>
      </div>
    </Layout>
  );
}

export default LandingPage;
          
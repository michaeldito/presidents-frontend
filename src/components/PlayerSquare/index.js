
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, Tag, Button, Badge } from 'antd';



// TODO:
// convert to function
export default class PlayerSquare extends React.Component {
  
  render() {
    let { player, currentPlayer } = this.props;
    let { seatPosition, drinksDrunk, drinksReceived } = player;

    let title = (
      <Layout.Content>
        <Badge
          count={`${seatPosition + 1}`}
          style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
        />
        <Typography.Title level={4}>{player.user.username}</Typography.Title>
        <Tag>{player.politicalRank !== undefined ? player.politicalRank.name : 'no rank'}</Tag>
      </Layout.Content>
    );

    let style = player.user._id === currentPlayer ? {
      border: '2px solid cyan', 
      padding: '10px'
    } : {
      padding: '10px'
    }

    return (
      <div style={{padding: '5px'}}>

        <Card size='medium' 
          title={title}
          style={style}
          >

        <Layout>

          <Layout.Content>
            <Layout style={{backgroundColor: 'white'}}>
             <Typography.Text type="secondary">drunk: {drinksDrunk}</Typography.Text>
             <Typography.Text type="secondary">received: {drinksReceived.length}</Typography.Text>
            </Layout>
          </Layout.Content>

        </Layout>

        <Layout>
            <Button type='default'>Give Drink</Button>
          </Layout>
        
      </Card>
      
      </div>

    )
  }
}
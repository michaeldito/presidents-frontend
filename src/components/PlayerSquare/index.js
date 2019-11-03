
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, Tag, Button, Badge } from 'antd';



// TODO:
// convert to function
export default class PlayerSquare extends React.Component {
  
  render() {
    let { player, currentPlayer, giveDrink } = this.props;
    let { seatPosition, drinksDrunk, drinksReceived } = player;

    let title = (
      <Layout.Content>

        <Badge
          count={`${seatPosition + 1}`}
          style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
        />

        <Layout style={{backgroundColor: 'white'}}>
          <Typography.Title style={{textAlign: 'center'}} level={4}>{player.user.username}</Typography.Title>
          <Tag style={{textAlign: 'center'}} color='orange'>{player.politicalRank !== undefined ? player.politicalRank.name : 'no rank'}</Tag>
          
          {
            player.nextGameRank !== undefined ? <Tag color='green'>{player.nextGameRank.name}</Tag> : null
          }

        </Layout>

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

          <Layout style={{backgroundColor: 'white'}}>
            <Typography.Title level={5} style={{textAlign: 'center'}}>
              {drinksDrunk}-{drinksReceived.length}
            </Typography.Title>
          </Layout>

          <Layout>
            <Button style={{textOverflow: 'ellipsis'}} type='default' onClick={() => giveDrink(player.user._id)}>
              Give Drink
            </Button>
          </Layout>
        
      </Card>
      
      </div>

    )
  }
}
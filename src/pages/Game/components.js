
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Table, Row, Col, Card, Typography, Tag, Button, Badge } from 'antd';
const { Text } = Typography;

const handToBeat = [
  {
    "_id": "5da126acffbd1930d5f92bf4",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd4",
        "name": "Jack",
        "character": "J",
        "value": 11,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "JHearts",
    "__v": 0
  },
  {
    "_id": "5da126acffbd1930d5f92bf4",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd4",
        "name": "Jack",
        "character": "J",
        "value": 11,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "JHearts",
    "__v": 0
  }
]

const dataSource = [
  {
    key: '1',
    seatPosition: '1',
    username: 'mdito',
    politicalRank: { name: 'President'}
  },
  {
    key: '2',
    seatPosition: '2',
    username: 'adito',
    politicalRank: { name: 'Vice-President'}
  },
  {
    key: '3',
    seatPosition: '3',
    username: 'ldito',
    politicalRank: { name: 'Secretary'}
  },
  {
    key: '4',
    seatPosition: '4',
    username: 'mattdito',
    politicalRank: { name: 'Senator'},
    currentPlayer: true
  },
  {
    key: '5',
    seatPosition: '5',
    username: 'gdito',
    politicalRank: { name: 'Secretary of Defense'}
  },
  {
    key: '6',
    seatPosition: '6',
    username: 'superlongassname',    
    politicalRank: { name: 'Speaker of the House'}
  },
  {
    key: '7',
    seatPosition: '7',
    username: 'bob',
    politicalRank: { name: 'Bob'}
  }
];

export class Player extends React.Component {
  
  render() {

    let title = <Layout.Content>
                  <Badge
                    count={this.props.data.seatPosition}
                    style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                  />
                  <Typography.Title level={4}>{this.props.data.username}</Typography.Title>
                  <Tag>{this.props.data.politicalRank.name}</Tag>
                </Layout.Content>;

    let style = this.props.data.currentPlayer ? {
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
             <Typography.Text type="secondary">dranks: #</Typography.Text>
             <Typography.Text type="secondary">owed: #</Typography.Text>
            </Layout>
          </Layout.Content>

          <Layout.Sider width='50%' theme='light'>
            <Button type='danger'>Give Drink</Button>
          </Layout.Sider>

        </Layout>
        
      </Card>
      
      </div>

    )
  }
}

export class InfoSquare extends React.Component {
  
  render() {
    return (
      <div style={{padding: '5px'}}>

      <Card size='medium' >

        <Layout>

          <Layout.Content>

            <Layout style={{backgroundColor: 'white'}}>
              <Typography.Text type="secondary">hand to beat</Typography.Text>
              {this.props.handToBeat.map(card => 
                <div style={{margin: '10px'}}>
                  <Button type="secondary">
                    {card.cardRank.value} {card.suit.character}
                  </Button>
                </div>
              )}
             </Layout>

          </Layout.Content>

        </Layout>
        
      </Card>
      
      </div>

    )
  }
}

export class GameArea extends React.Component {
  
  render() {
    return (
      <Row>
        {dataSource.map(data => 
          <Col span={8}>
            <Player data={data} />
          </Col>
        )}
        <Col span={8}>
            <InfoSquare handToBeat={handToBeat}/>
          </Col>
      </Row>
    )
  }
}


export class PlayersHand extends React.Component {
  
  render() {
    let { cards } = this.props;
    let cardComponents = cards.map(card => 
      <div style={{margin: '10px'}}>
        <Button type="secondary">
          {card.cardRank.value} {card.suit.character}
        </Button>
      </div>
    )
    
    return (
      <Row type="flex" justify="start">
        {cardComponents}
      </Row>
    )
  }
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}


export class CardsRemaining extends React.Component {
  
  render() {
    let { cards } = this.props;
    cards = cards.map(card => {
      let value = card.cardRank.value;
      let rankChar = card.cardRank.character;
      let suitChar = card.suit.character;
      return { value, rankChar, suitChar };
    });
    let cardsByValue = groupBy(cards, card => card.value)
    cardsByValue = Array.from(cardsByValue, ([key, value]) => value)
    console.log(cardsByValue)
    cardsByValue = cardsByValue.sort((a, b) => (a[0].value > b[0].value) ? 1 : -1)
    console.log(cardsByValue)


    let cardComponents = cardsByValue.map(group => <Col span={4}>
      <Text strong style={{padding: '5px'}}>{group[0].rankChar}</Text>
      {group.map(card => <Text code>{card.suitChar}</Text>)}
    </Col>)

    return (
      <Row>
      {cardComponents}
      </Row>
    )
  }
}
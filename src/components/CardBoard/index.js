
import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Typography } from 'antd';
const { Text } = Typography;

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

// TODO:
// convert to function
export default class CardBoard extends React.Component {
  
  render() {
    
    if (this.props.cards === undefined) {
      return <div></div>
    }
    
    let { cards } = this.props;
    
    cards = cards.map(card => {
      let color = card.color;
      let value = card.cardRank.value;
      let rankChar = card.cardRank.character;
      let suitChar = card.suit.character;
      return { value, rankChar, suitChar, color };
    });

    let cardsByValue = groupBy(cards, card => card.value)
    cardsByValue = Array.from(cardsByValue, ([key, value]) => value)
    cardsByValue = cardsByValue.sort((a, b) => (a[0].value > b[0].value) ? 1 : -1)

    let cardComponents = cardsByValue.map((group, idx) => 
      <Col span={4} key={idx}>
        <Text strong style={{padding: '5px'}}>{group[0].rankChar}</Text>
        {group.map((card, idx) => <Text key={idx} code style={{backgroundColor: card.color}}>{card.suitChar}</Text>)}
      </Col>
    );

    return (
      <Row>
        {cardComponents}
      </Row>
    )
  }
}
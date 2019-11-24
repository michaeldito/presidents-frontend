
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, PageHeader, Button, Tag, Row, Col } from 'antd';

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
            <Typography.Text strong>Sent By:</Typography.Text>
            <Tag> {item.sentBy}</Tag>
          </Col>


          <Col span={6}>
            <Typography.Text strong>Status:</Typography.Text>
            <Tag color='cyan'>{item.status.value}</Tag>
          </Col>

          <Col span={6}>
            <Button>JOIN</Button>
            <Button>GO</Button>
          </Col>
        
        </Row>

      </Card>
    );

    return (
      <Layout>
        <PageHeader onBack={() => null} title="Inbox"/>
        {inboxItems}
      </Layout>
    );
  }
}
          
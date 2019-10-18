
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, PageHeader, Button, Tag, Row, Col } from 'antd';
import Sidebar from '../../components/Sidebar';

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
                
        <Sidebar />

        <Layout>

          <PageHeader onBack={() => null} title="Inbox"/>

          {inboxItems}

        </Layout>
      </Layout>
    );
  }
}
          
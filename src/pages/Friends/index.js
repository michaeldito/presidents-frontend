
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, PageHeader, Tag, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';


const friends = [
  {
    username: 'tommypastrami'
  },
  {
    username: 'bellamortadella'
  },
  {
    username: 'tonypepperoni'
  },
  {
    username: 'longjohnson'
  },
  {
    username: 'bill'
  },
  {
    username: 'larrycarter'
  },
  {
    username: 'dumbass'
  },
  {
    username: 'other dumbass'
  }
]

function listToMatrix(list, elementsPerSubArray) {
  var matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
          k++;
          matrix[k] = [];
      }

      matrix[k].push(list[i]);
  }

  return matrix;
}

          
export default class Friends extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {

    let friendsOf4 = listToMatrix(friends, 4);
    let friendComponents = friendsOf4.map(group => 
      <Row align='middle' gutter={16}>
        {group.map(friend => (
          <Col span={6}>
              <Card size='large' style={{ display: 'flex', justifyContent:'center' }}>
                <Typography strong style={{ display: 'flex', justifyContent:'center' }}>
                  <NavLink
                    key={`/profile`}
                    to={`/profile`}
                  >
                    {friend.username}
                  </NavLink>
                </Typography>
                <Tag color='geekblue' style={{ display: 'flex', justifyContent:'center' }}>message</Tag>
              </Card>
          </Col>
        ))}
      </Row>
    )

    return (
      <Layout>
        <PageHeader onBack={() => null} title="Friends"/>
        {friendComponents}
      </Layout>
    );
  }
}
          

import React from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Layout,
  PageHeader,
  Dropdown,
  Menu,
  Row, Col
} from 'antd';
import Sidebar from '../../components/Sidebar';
import {SearchTable} from '../../components';

import {getGamesToJoin} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

const { Content } = Layout;

const configs = [
  {name: 'Presidents'},
  {name: 'War'},
  {name: 'Go Fish'}
];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.props.getGamesToJoin();
    this.state = {
      collapsed: false,
      name: ''
    };
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    function handleMenuClick(e) {
      console.log('click', e);
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
      {configs.map((config, idx) =>
        <Menu.Item key={idx} onClick={() => this.setState({name: config.name})}>
          {config.name}
        </Menu.Item>
      )}
      </Menu>
    );

    return (
      <Layout>

        <Sidebar />

        <Content>

          <PageHeader onBack={() => null} title="Search" />

          <Layout>

            <Row>

            <Col span={4}>

              <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item style={{marginLeft:10}}>
                  <Dropdown overlay={menu}>
                    <Button style={{width: '100%'}}>
                      {this.state.name !== '' ? this.state.name : 'Select Type'}
                    </Button>
                  </Dropdown>
                </Form.Item>

                <Form.Item  style={{marginLeft:10}}>
                  <Input placeholder='Enter Name' onChange={(c) => this.handleChange(c)} />
                </Form.Item>

              </Form>

              </Col>

            </Row>

            <Row>

              <Col>

                <SearchTable data={this.props.data} alreadyJoinedGames={this.props.user.gamesPlayed}/>
              
              </Col>

            </Row>

          </Layout>


        </Content>

      </Layout>
    );
  }
}

let SearchComponent = Form.create({ name: 'search' })(Search);

function mapStateToProps(state) {
	return {
    user: state.user,
    data: state.game.allGameData
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getGamesToJoin
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SearchComponent);
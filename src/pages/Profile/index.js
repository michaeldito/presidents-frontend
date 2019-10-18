
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, PageHeader, Typography } from 'antd';
import Sidebar from '../../components/Sidebar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

const { Content } = Layout;

class Profile extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    let {username, gamesPlayed, email } = this.props.user;
    console.log(gamesPlayed)

    return (
      <Layout style={{ minHeight: '100vh' }}>
      
        <Sidebar />
        
        <Layout>

          <PageHeader onBack={() => null} title="Profile"/>
          
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff', minHeight: 180 }}>
            <Typography>{username}</Typography>
            <Typography>Games Played: {gamesPlayed.length}</Typography>
            <Typography>email: {email}</Typography>
            </div>
          
          </Content>
          
        
        </Layout>

      </Layout>
    );
  }
}

function mapStateToProps(state) {
	return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

  }, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);
import React from "react";
import "antd/dist/antd.css";
import { Layout, PageHeader, Typography } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { Content } = Layout;

const Profile = ({ user }) => {
  let { username, gamesPlayed, email } = user;

  return (
    <Layout>
      <PageHeader onBack={() => null} title="Profile" />
      <Content style={{ margin: "0 16px" }}>
        <div
          style={{
            padding: 24,
            marginTop: 10,
            marginBottom: 10,
            background: "#fff",
            minHeight: 180
          }}
        >
          <Typography>{username}</Typography>
          <Typography>Games Played: {gamesPlayed.length}</Typography>
          <Typography>Wmail: {email}</Typography>
        </div>
      </Content>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

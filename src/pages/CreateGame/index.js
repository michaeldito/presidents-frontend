import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Layout, PageHeader, Dropdown, Menu } from "antd";
import { createGame } from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { Content } = Layout;

let CreateGame = ({ userId, createGame, configs = [] }) => {
  let [gameType, setGameType] = useState("");
  let [name, setName] = useState("");
  let [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    createGame({ name, gameType, createdBy: userId });
    setSubmitted(true);
  };

  const menu = (
    <Menu>
      {configs.map((config, idx) => (
        <Menu.Item key={idx} onClick={() => setGameType(config)}>
          {config}
        </Menu.Item>
      ))}
    </Menu>
  );

  const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 4 },
      sm: { span: 4 }
    }
  };

  return (
    <React.Fragment>
      {submitted && <Redirect to="/game" />}
      <Layout style={{ height: "100vh", width: "100vw" }}>
        <PageHeader title="Create Game" />

        <Layout.Content style={{ paddingLeft: "20px", paddingTop: "10px" }}>
          <Form {...formItemLayout} layout="vertical">
            <Form.Item
              label={
                <span>
                  <b>Game Type</b>
                </span>
              }
            >
              <Dropdown overlay={menu}>
                <Button style={{ minWidth: "100px" }}>
                  {gameType === "" ? "Select Type" : gameType}
                </Button>
              </Dropdown>
            </Form.Item>

            <Form.Item
              label={
                <span>
                  <b>Game Name</b>
                </span>
              }
            >
              <Input
                name="name"
                placeholder="Enter Name"
                onChange={e => setName(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Layout.Content>

        <Layout.Footer style={{ bottom: "0px" }}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
            style={{ margin: "auto" }}
            onClick={e => handleSubmit(e)}
          >
            Create
          </Button>
        </Layout.Footer>
      </Layout>
    </React.Fragment>
  );
};

CreateGame = Form.create({ name: "create" })(CreateGame);

function mapStateToProps(state) {
  return {
    userId: state.user._id,
    configs: state.createGame.configs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createGame
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);

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

  return (
    <Layout>
      {submitted && <Redirect to="/game" />}
      <Content>
        <PageHeader onBack={() => null} title="Create Game" />
        <Layout>
          <Layout.Content style={{ marginLeft: 10 }}>
            <Form layout="inline" onSubmit={handleSubmit}>
              <Form.Item>
                <Dropdown overlay={menu}>
                  <Button>{gameType !== "" ? gameType : "Select Type"}</Button>
                </Dropdown>
              </Form.Item>

              <Form.Item>
                <Form.Item>
                  <Input
                    name="name"
                    placeholder="Enter Name"
                    onChange={e => setName(e.target.value)}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ margin: "auto" }}
                >
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Layout.Content>
        </Layout>
      </Content>
    </Layout>
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

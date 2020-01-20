import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { getInstanceSet } from "./actions";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Layout, PageHeader } from "antd";
import { Search, Class } from "./components";
const { Content } = Layout;

const Admin = ({ classes = {}, instanceSet, getInstanceSet }) => {
  let [currentClass, setCurrentClass] = useState("");
  let dataSource = [
    {
      title: "Classes",
      children: Object.keys(classes).map(c => ({ title: c }))
    }
  ];
  console.dir(classes);
  return (
    <Layout>
      <PageHeader title="Admin" />
      <Content
        style={{ background: "#fff", overflow: "scroll", padding: "20px" }}
      >
        <Search dataSource={dataSource} setCurrentClass={setCurrentClass} />
        {currentClass ? (
          <Class
            className={currentClass}
            schema={classes[currentClass].schema}
            service={classes[currentClass].service}
            instanceSet={instanceSet}
            getInstanceSet={getInstanceSet}
          />
        ) : null}
      </Content>
    </Layout>
  );
};

function mapStateToProps(state) {
  return state.admin;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getInstanceSet
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);


import React from 'react';
import 'antd/dist/antd.css';
import { Layout, PageHeader } from 'antd';
import { InstanceTabs } from './components';
const { Content } = Layout;

const Admin = () => {
  return (
    <Layout>
      <PageHeader title="Admin" />
      <Content style={{ background: '#fff', overflow: 'scroll' }}>
        <InstanceTabs />
      </Content>
    </Layout>
  );
}
        
export default Admin;
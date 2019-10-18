
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, PageHeader } from 'antd';
import Sidebar from '../../components/Sidebar';


export default class Dashboard extends React.Component {
    /**
     * if (just registered or just logged in)
     *  clear registered of logged in state
     *     notification.create()
     */
    

  render() {
    

    return (
      <Layout style={{ minHeight: '100vh' }}>
                
        <Sidebar />
        
        <Layout>

          <PageHeader title="Dashboard"/>
  
        </Layout>
      </Layout>
    );
  }
}
          
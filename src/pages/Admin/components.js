import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Typography, List, Layout, Descriptions, Tree, Icon, Input, AutoComplete, Tabs } from 'antd';
const { TabPane } = Tabs;
const { TreeNode } = Tree;
const { Option, OptGroup } = AutoComplete;


const options = dataSource => dataSource.map(group =>
  <OptGroup key={group.title} label={group.title}>
    {group.children.map(opt => (
      <Option key={opt.title} value={opt.title}>
        {opt.title}
        <span className='certain-search-item-count'>count</span>
      </Option>
    ))}
  </OptGroup>);

export const Search = ({ dataSource, setCurrentClass }) =>
  <div className='certain-category-search-wrapper' style={{ width: 250 }}>
    <AutoComplete
      className='certain-category-search'
      dropdownClassName='certain-category-search-dropdown'
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      size='large'
      style={{ width: '100%' }}
      dataSource={options(dataSource)}
      placeholder='Search Classes'
      optionLabelProp='value'
      onSelect={item => setCurrentClass(item)}
    >
      <Input suffix={<Icon type='search' className='certain-category-icon' />} />
    </AutoComplete>
  </div>

const Instance = ({ instance }) => {
  return (
    <Tree
      showLine={true}
      showIcon={true}
    >
      <TreeNode title={instance.kind} key={instance._id}>
      {
        Object.keys(instance).map((data, idx) =>
          <TreeNode title={data} key={idx}>
            <TreeNode title={JSON.stringify(instance[data])} key={idx}/>
          </TreeNode>)
      }
      </TreeNode>
    </Tree>
  );
}

export const Class = ({ className, schema, service, instanceSet = {data:[]}, getInstanceSet }) => {
  const handleTabChange = key => {
    if (key === 'Instances') {
      getInstanceSet(service.name)
    }
  }
  return (
    <Layout.Content style={{paddingTop: '10px'}}>
      <Descriptions title={<Typography.Title>{className}</Typography.Title>}>
        {Object.keys(schema).map(key =>
          <Descriptions.Item key={key} label={key}>{schema[key].type}</Descriptions.Item>
        )}
      </Descriptions>
      <Tabs onChange={(key) => handleTabChange(key)}>

        <TabPane tab='Services' key='Services'>
          <List 
            size='large'
            bordered
            dataSource={service.operations}
            renderItem={(operation, idx) => <List.Item key={idx}>
              <Typography.Text>[{operation.methods}]</Typography.Text> {operation.path}
            </List.Item>}
          />
        </TabPane>

        <TabPane tab={`Instances${instanceSet.total ? ` (${instanceSet.total})` : ''}`} key='Instances'>
          <List
            size='large'
            bordered
            dataSource={instanceSet.data}
            renderItem={instance => <List.Item key={instance._id}>{instance.displayId}</List.Item>}
          />
        </TabPane>

      </Tabs>
    </Layout.Content>
  );
}
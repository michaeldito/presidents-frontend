import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Typography, Table, List, Layout, Descriptions, Tree, Icon, Input, AutoComplete, Tabs } from 'antd';
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
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: name => <a>{name}</a>,
  }, {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: value => <a>{value}</a>,
  }, {
    title: 'Required',
    dataIndex: 'required',
    key: 'required',
    render: required => <a>{required ? 'True' : 'False'}</a>,
  }, {
    title: 'Unique',
    dataIndex: 'unique',
    key: 'unique',
    render: unique => <a>{unique ? 'True' : 'False'}</a>,
  }];
  let attributes = [];
  let relationships = [];
  const relationshipColumns = [{
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: c => <a>{c ? c : ''}</a>
    },
    ...columns,
    {
      title: 'Singular',
      dataIndex: 'singular',
      key: 'singular',
      render: singular => <a>{singular ? 'True' : 'False'}</a>
    },
  ]
  Object.keys(schema).forEach(key => {
    if (schema[key].ref) {
      relationships.push({
        key, 
        name:key, 
        value:schema[key].type, 
        unique:schema[key].unique, 
        required:schema[key].required, 
        class:schema[key].ref,
        singular:schema[key].type !== 'Array'
      });
    } else {
      if (key !== 'extends') {
        attributes.push({
          key, 
          name:key, 
          value:schema[key].type, 
          unique:schema[key].unique, 
          required:schema[key].required
        });
      }
    }
  });
  console.table(attributes)
  console.table(relationships)
  return (
    <Layout.Content style={{paddingTop: '10px'}}>
      <Descriptions title={<Typography.Title>{className}</Typography.Title>}>
        {schema['extends'] !== undefined ? <Descriptions.Item key={'extends'} label={'extends'}>{schema['extends'].type}</Descriptions.Item> : null}
      </Descriptions>
      <Tabs onChange={(key) => handleTabChange(key)}>

        <TabPane tab='Schema' key='Schema'>
          <Typography.Title level={3}>Attributes</Typography.Title>
          <Table pagination={false} columns={columns} dataSource={attributes} />
          <Typography.Title level={3}>Relationships</Typography.Title>
          <Table pagination={false} columns={relationshipColumns} dataSource={relationships} />
        </TabPane>
        
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
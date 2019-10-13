import React from 'react';
import { Table, Divider, Tag, Button, Pagination } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
    render: text => <a>{text.user}</a>,
  },
  {
    title: 'Winner',
    dataIndex: 'winner',
    key: 'winner',
    render: text => <a>{text.username}</a>,
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      let color = status.value === 'NOT_STARTED' ? 'green' : status.value === 'IN_PROGRESS' || status.value === 'FINALIZED' ? 'volcano' : 'geekblue';
      return (
        <Tag color={color} key={status}>
          {status.value.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button>JOIN</Button>
        <Divider type="vertical" />
        <Button>GO</Button>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'First Presidents Game Ever',
    status: { value: 'IN_PROGRESS' },
    createdBy: { user: 'mdito'},
    winner: { username: '-'},
    type: 'Presidents'
  },
  {
    key: '2',
    name: 'Bob\'s Game',
    status: { value: 'NOT_STARTED' },
    createdBy: { user: 'bob'},
    winner: { username: '-'},
    type: 'Presidents'
  },
  {
    key: '3',
    name: 'Stanly Biggims\' Game',
    status: { value: 'FINALIZED' },
    createdBy: { user: 'idk'},
    winner: { username: 'idk'},
    type: 'Presidents'
  },
];


export default class SearchTable extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </React.Fragment>
    )
  }
}

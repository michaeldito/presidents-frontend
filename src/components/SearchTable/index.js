import React from 'react';
import { Table, Tag } from 'antd';
import ActionableButton from '../ActionableButton';



// TODO:
// convert to function
export default class SearchTable extends React.Component {

  render() {

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Date Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <div>{new Date(text).toLocaleDateString("en-US")}</div>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: user => <div>{user.username}</div>,
      },
      {
        title: 'Winner',
        dataIndex: 'winner',
        key: 'winner',
        render: winner => <div>{winner}</div>,
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
        key: 'id',
        render: game => (
          <div>
            {this.props.alreadyJoinedGames.forEach(joinedGameId => {
              //console.log(`${joinedGameId} === ${game.id.toString()} : ${joinedGameId === game.id.toString()}`)
            })}
            {this.props.alreadyJoinedGames.find(joinedGame => joinedGame === game.id.toString()) 
              ? 
              <ActionableButton name='go' id={game.id.toString()}/>
              :
              <ActionableButton name='join' id={game.id.toString()}/>
              }            
          </div>
        ),
      },
    ];

    return (
      <React.Fragment>
        <Table columns={columns} dataSource={this.props.data} pagination={false} rowKey='name'/>
      </React.Fragment>
    )
  }
}

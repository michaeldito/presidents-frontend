import React from 'react';
import { Table, Tag, Button } from 'antd';
import ActionableButton from '../ActionableButton';

function calculateColor(value) {
  switch (value) {
    case 'NOT_STARTED': return 'green';
    case 'IN_PROGRESS': return 'blue';
    case 'FINALIZED': return 'volcano';
    default: return 'geekblue';
  }
}
  

// TODO:
// convert to function
export default class SearchTable extends React.Component {

  render() {
    const b = <Button>None</Button>

    const columns = [
      {
        title: 'Action',
        key: 'id',
        render: game => (
          <div>
            {this.props.alreadyJoinedGames.forEach(joinedGameId => {
              //console.log(`${joinedGameId} === ${game.id.toString()} : ${joinedGameId === game.id.toString()}`)
            })}
            {
              // if the user has joined and its in progress tell them Go
              this.props.alreadyJoinedGames.find(joinedGame => joinedGame === game.id.toString()) && game.status.value === 'IN_PROGRESS'
              ? 
              <ActionableButton name='Go' id={game.id.toString()}/>
              // if the game hasn't started they can Join
              : game.status.value === 'NOT_STARTED' ?
                <ActionableButton name='Join' id={game.id.toString()}/>
              : // they didnt't join and the game is in progress or over
                <ActionableButton name='Go' id={game.id.toString()}/>
              }            
          </div>
          
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => {
          let {value} = status;
          let color = calculateColor(value);
          return (
            <Tag color={color} key={status}>
              {status.value.toUpperCase()}
            </Tag>
          );
        }
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Date Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <div>{new Date(text).toLocaleDateString("en-US")}</div>,
      }
    ];

    return (
      <React.Fragment>
        <Table columns={columns} dataSource={this.props.data} pagination={false} rowKey='name'/>
      </React.Fragment>
    )
  }
}

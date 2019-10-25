import socket from 'socket.io-client';
import React, { Component } from 'react';


export default class GameSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    const io = socket('http://localhost:8080');

    io.on('connect', () => {
      console.log('[GameSocket] connected');
    });

    io.on('disconnect', () => {
      console.log('[GameSocket] disconnected');
    });

    io.on('game refresh', data => {
      const { getGame } = props;
      console.log('[GameSocket] game refresh');
      console.dir(data);
      updateGame(data);
    });

    io.on('drink given', (data) => {
      const { getGame } = props;
      console.log('[GameSocket] drink given');
      console.dir(data);
      updateGame(data);
    });

    io.on('drink drunk', (data) => {
      const { getGame } = props;
      console.log('[GameSocket] drink dunk');
      console.dir(data);
      updateGame(data);
    });

    io.on('rematch started', (data) => {
      const { getGame } = props;
      console.log('[GameSocket] rematch started');
      console.dir(data);
      updateGame(gamdataeId);
    });

    io.on('error', data => {
      console.log(`[GameSocket] error`);
      console.log(data.error);
    });

  }
  
  render() {
    return (
      <React.Fragment />
    )
  }
}
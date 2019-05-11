
import React, { Component } from 'react';
import GameTable from '../../components/GameTable';
import Stats from '../../components/Stats';
import PlayersHand from '../../components/PlayersHand.js'

export default class Game extends Component {
  render() {
    return (
      <React.Fragment>
        <Stats />
        <GameTable />
        <PlayersHand /> 
      </React.Fragment>
    )
  }
}
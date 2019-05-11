import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    const { rank, suite } = this.props;
    return (
      <React.Fragment>
        <img className='card' alt="oh no" src={require(`../../assets/cards/${rank}${suite}.svg`)}/>
      </React.Fragment>
    )
  }
}
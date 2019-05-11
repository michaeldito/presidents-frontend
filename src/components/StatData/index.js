import React from 'react';
import { MiniTile } from '../general';
import { CardValue, StatTable, StatBody, StatRow, StatCell } from './components';

export default function StatData({card}) {
  return(
    <MiniTile>
      <CardValue>{card}</CardValue>
        <StatTable>
          <StatBody>
            <StatRow>
              <StatCell>
                <img alt='' src={require(`../../assets/heart.svg`)}/>
              </StatCell>
              <StatCell>
                <img alt='' src={require(`../../assets/spade.svg`)}/>
              </StatCell>
              <StatCell>
                <img alt='' src={require(`../../assets/club.svg`)}/>
              </StatCell>
              <StatCell>
                <img alt='' src={require(`../../assets/diamond.svg`)}/>
              </StatCell>            
            </StatRow>
          </StatBody>
        </StatTable>
    </MiniTile>
  )
}

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import PlayerSquare from '../../components/PlayerSquare';
import { Layout, List, Card, Typography, Tag } from 'antd';

import Video from 'twilio-video';

// TODO:
// convert to function
export class InfoSquare extends React.Component {
  
  render() {
    let { handToBeat } = this.props;

    console.log(`InfoSquare@render] handToBeat: ${handToBeat}`)
    console.log(`InfoSquare@render] handToBeat === undefined: ${handToBeat === undefined}`);

    let title = <Typography.Text type='secondary'>Hand to Beat</Typography.Text>
    let shouldRender = handToBeat === [] ? false : true;

    if (shouldRender) {
      return (
        <div style={{padding: '5px'}}>
          <Card size='medium' style={{padding:'10px'}} title={title}>
            <Layout>
                <Layout.Content style={{backgroundColor: 'white'}}>

                  {handToBeat.map((card, idx) => 
                    <span key={idx} style={{margin: '10px'}}>
                      <Tag type='dis'>
                        {card.cardRank.character} {card.suit.character}
                      </Tag>
                    </span>
                  )}
                  
                </Layout.Content>
            </Layout>
          </Card>
      </div>
      )
    } else {
      return <div></div>
    }
  }
}

InfoSquare.propTypes = {
	handToBeat: PropTypes.array
}

InfoSquare.defaultProps = {
	handToBeat: []
}
   

// TODO:
// convert to function
export const GameArea = ({ game, giveDrink, roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      console.log(`participant connected`)
      console.dir(participant)
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      console.log(`participant disconnected`)
      console.dir(participant)
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    if (token) {
      console.log('connecting to twilio video chat')
      Video.connect(token, {
        name: roomName
      }).then(room => {
        console.dir(room)
        setRoom(room);
        console.dir(room)
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        participantConnected(room.localParticipant);
        room.participants.forEach(participantConnected);
      }).catch(err =>{
        console.log(err)
      })
      console.log('after video setup')
      return () => {
        setRoom(currentRoom => {
          if (currentRoom && currentRoom.localParticipant.state === 'connected') {
            console.log(`disconnecting from video room`)
            currentRoom.disconnect();
            return null;
          } else {
            return currentRoom;
          }
        });
      };
    } else {
      if (room) {
        room.participants.forEach(participantDisconnected);
        participantDisconnected(room.localParticipant)
        room.disconnect();
        setRoom(null)
      }
    }
  }, [roomName, token]);

  const findParticipantByUsername = username => {
    console.log(`finding participant for user: ${username}`)
    let p =  participants.find(participant => participant.identity === username);
    console.log(p);
    return p;
  }

  
  return (
      <List
        grid={{
          gutter: 12,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={game.players}
        renderItem={player => (
          <List.Item>
            <PlayerSquare 
              key={player._id}
              player={player} 
              currentPlayer={game.currentPlayer} 
              giveDrink={giveDrink}
              participant={findParticipantByUsername(player.user.username) === undefined ? null : findParticipantByUsername(player.user.username)}
            />
          </List.Item>
        )}
      />
    )
}

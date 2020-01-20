import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Player from "./Player";
import { List } from "antd";
import Video from "twilio-video";

const Players = ({ game, giveDrink, roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    if (token) {
      Video.connect(token, {
        name: roomName
      })
        .then(room => {
          setRoom(room);
          room.on("participantConnected", participantConnected);
          room.on("participantDisconnected", participantDisconnected);
          participantConnected(room.localParticipant);
          room.participants.forEach(participantConnected);
        })
        .catch(err => {
          console.log(err);
        });
      return () => {
        setRoom(currentRoom => {
          if (
            currentRoom &&
            currentRoom.localParticipant.state === "connected"
          ) {
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
        participantDisconnected(room.localParticipant);
        room.disconnect();
        setRoom(null);
      }
    }
  }, [room, roomName, token]);

  const findParticipantByUsername = username => {
    let p = participants.find(participant => participant.identity === username);
    return p;
  };

  return (
    <List
      grid={{
        gutter: 12,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 8
      }}
      dataSource={game.players}
      renderItem={player => (
        <List.Item>
          <Player
            key={player._id}
            player={player}
            currentPlayer={game.currentPlayer}
            giveDrink={giveDrink}
            participant={
              findParticipantByUsername(player.user.username) === undefined
                ? null
                : findParticipantByUsername(player.user.username)
            }
          />
        </List.Item>
      )}
    />
  );
};

export default Players;

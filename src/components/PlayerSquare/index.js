
import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, Tag, Button, Badge, Icon } from 'antd';



// TODO:
// convert to function
const PlayerSquare = ({player, currentPlayer, giveDrink, participant}) => {
  
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    if (! participant) {
      return f=>f
    }

    console.log(participant);
    setVideoTracks(Array.from(participant.videoTracks.values()));
    setAudioTracks(Array.from(participant.audioTracks.values()));

    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    if (! videoTracks) {
      return f=>f
    }
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    if (! audioTracks) {
      return f=>f
    }
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  let { seatPosition, drinksDrunk, drinksReceived } = player;

  let title = (
    <Layout.Content>

      <Badge
        count={`${seatPosition + 1}`}
        style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
      />

      <Layout style={{backgroundColor: 'white'}}>
        <Typography.Title style={{textAlign: 'center'}} level={4}>{player.user.username}</Typography.Title>
        <Tag style={{textAlign: 'center'}} color='orange'>{player.politicalRank !== undefined ? player.politicalRank.name : 'no rank'}</Tag>
        
        {
          player.nextGameRank !== undefined ? <Tag color='green' style={{textAlign: 'center'}}>{player.nextGameRank.name}</Tag> : null
        }

      </Layout>

    </Layout.Content>
  );


  let style = player.user._id === currentPlayer ? {
    border: '2px solid cyan', 
    backgroundColor: '#000000'
  } : {
    backgroundColor: '#000000'
  }


  return (
      <Card size='medium' 
        //title={title}
        style={style}
        >

      <Layout.Content style={{display: 'flex', alignItems: 'flex-start'}}>
        <Badge
          count={`${seatPosition + 1}`}
          style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width: '10%' }}
        />
        <Typography.Title style={{color: 'white', textAlign: 'right', width:' 90%'}} level={4}>{player.user.username}</Typography.Title>
      </Layout.Content>

      {participant !== null ?
        <div>
          <video width='100%' height='100%' ref={videoRef} autoPlay={true} />
          <audio ref={audioRef} autoPlay={true} muted={true} />
        </div> : null
      }
        

        <Layout.Content style={{display: 'flex', alignItems: 'flex-start'}}>
          {player.nextGameRank === undefined ? 
            <Tag 
              style={{textAlign: 'left', width: '33%'}} 
              color='orange'>
                {player.politicalRank !== undefined ? player.politicalRank.name : 'no rank'}
            </Tag> : null }
          {player.nextGameRank !== undefined ? 
            <Tag 
              color='green' 
              style={{textAlign: 'left', width: '33%'}}>
                {player.nextGameRank.name}
            </Tag> : null}
          <Button 
            style={{'overflow': 'hidden', 'textOverflow': 'ellipsis', 'whiteSpace': 'nowrap', margin: 'auto'}} 
            shape='circle' 
            onClick={() => giveDrink(player.user._id)}
            icon="coffee" 
          />
          <Typography 
            style={{color: 'white', textAlign: 'right', width: '33%', fontSize: '1em'}}
              >
              {drinksDrunk}-{drinksReceived.length}
          </Typography>
        </Layout.Content>
      
      </Card>
  )
}
export { PlayerSquare as default };

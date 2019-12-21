
import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Layout, Card, Typography, Tag, Button } from 'antd';


const Player = ({ player, currentPlayer, giveDrink, participant }) => {
  
  let [videoTracks, setVideoTracks] = useState([]);
  let [audioTracks, setAudioTracks] = useState([]);
  let [muted, setMuted] = useState(true);

  let videoRef = useRef();
  let audioRef = useRef();

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

  const { drinksDrunk, drinksReceived } = player;

  const cardStyle = player.user._id === currentPlayer ? {
    border: '5px solid #1890ff', 
    backgroundColor: '#000000',
    borderRadius: '5px',
  } : {
    border: '5px solid #000000', 
    backgroundColor: '#000000',
    borderRadius: '5px',
  }

  const title = (
    <div style={{display: 'flex', justifyContent: 'space-between'}} >

      <h4 style={{ color: 'white'}}>
        {player.user.username}
      </h4>

      <Button 
        size='small'
        onClick={() => giveDrink(player.user._id)}
        icon="coffee" 
      >
        Give Drink
      </Button>
      
      {
        participant ? 
          <Button 
            size='small' 
            icon={muted ? 'sound' : 'notification'}
            onClick={() => setMuted(!muted)}
          >
            {muted ? 'Unmute': 'Mute'}
          </Button> : null
      }

    </div>
  );

  const contentStyle = {paddingBottom: '5px', width: '100%', position: 'absolute', bottom: 0, display: 'flex', alignItems: 'flex-start'};

  return (
    <Card 
      size='large' 
      style={cardStyle}
      title={title}>

      <div style={{width: '100%', height: '100%'}}>
        {participant !== null ?
          <div>
            <video width='100%' height='100%' ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={muted} />
          </div> : null
        }
      </div>

      <Layout.Content style={contentStyle}>
        {
          player.nextGameRank === undefined ? 
          <Tag 
            style={{textAlign: 'center', width: '33%'}} 
            color='orange'>
              {player.politicalRank !== undefined ? player.politicalRank.name : 'no rank'}
          </Tag> : null 
        }
        {
          player.nextGameRank !== undefined ? 
          <Tag 
            color='green' 
            style={{textAlign: 'center', width: '33%'}}>
              {player.nextGameRank.name}
          </Tag> : null
        }
        <Typography style={{color: 'white', textAlign: 'right', width: '33%', fontSize: '1em'}}>
          {drinksDrunk}-{drinksReceived.length}
        </Typography>
      </Layout.Content>
      
    </Card>
  )
}

export { Player as default };

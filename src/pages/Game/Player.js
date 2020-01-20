
import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Card, Icon, Avatar, Tooltip } from 'antd';
import { CenteredTitle } from './components';
import NoVideoImage from '../../assets/novideo.png';


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

  const GiveDrinkButton = ( 
    <Tooltip placement='top' title={`Give ${player.user.username} a drink`}>
      <Icon 
        onClick={() => giveDrink(player.user._id)}
        type="coffee" 
      />
    </Tooltip>
  )

  const MuteButton = participant ? 
    <Tooltip placement='top' title={`${muted ? 'Unmute' : 'Mute'} ${player.user.username}`}>
      <Icon 
        type={muted ? 'sound' : 'notification'}
        onClick={() => setMuted(!muted)}
      />
    </Tooltip> : 
    <Tooltip placement='top' title={`${muted ? 'Unmute' : 'Mute'} ${player.user.username}`}>
      <Icon type={muted ? 'sound' : 'notification'} />
    </Tooltip>

  const AudioVideo = participant !== null ?
      <div style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        <video width='100%' height='100%' ref={videoRef} autoPlay={true} />
        <audio ref={audioRef} autoPlay={true} muted={muted} /> 
      </div> : <img width='100%' height='100%' src={NoVideoImage} alt='no video'/>

  const cardStyle = {
    border: `8px solid ${player.user._id === currentPlayer ? '#1890ff' : '#000000'}`, 
    borderRadius: '5px',
    width: '100%', 
    height: '100%',
  };

  const title = player.politicalRank !== undefined ? 
    <CenteredTitle value={player.politicalRank.name} /> :
    <CenteredTitle value='No Rank' />

  return (
    <Card 
      bordered
      size='large' 
      title={title}
      style={cardStyle}
      actions={[
        GiveDrinkButton,
        <Avatar>{player.user.username[0].toUpperCase()}</Avatar>,
        MuteButton
      ]}
      bodyStyle={{padding: '0px'}}
      headStyle={{backgroundColor: ''}}
    >
      {AudioVideo}
    </Card>
  )
}

export { Player as default };

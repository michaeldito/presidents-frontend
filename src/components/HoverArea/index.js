import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { ChatApp, YouTubeSearch, FadeIn } from './components';
import ReactDOM from 'react-dom';

const HoverArea = ({username, gameId, settings}) => {  
  console.log('hoverareatype settings');
  console.log(settings)

  let _root = document.getElementById('hover-area-root');

  let component = settings.type === 'youtube' ? 
    <YouTubeSearch /> 
    : 
    <ChatApp username={username} gameId={gameId}/>;

  let content = (
      <FadeIn 
        style={{
          position: 'fixed', 
          top: '15px', 
          right:'28px', 
          border: '1px solid #505370',
          borderRadius: '5px',
          backgroundColor: 'white',
          margin: 2,
          zIndex: 999,
          maxHeight: '88%',
          display: 'flex',
          flexFlow: 'column',
        }}
        >
        {component}
    </FadeIn>
  )
  return ReactDOM.createPortal(content, _root);
}

export default HoverArea;
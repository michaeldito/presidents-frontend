import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { YoutubeDataAPI } from 'youtube-v3-api';
import { List, Typography, Input } from 'antd';
import _ from 'lodash';
const API_KEY = 'AIzaSyDCPJJTkT8pg_m4WoLI7JjmAMbY6F8rNY8';


const YouTubePlayer = () => {

  let [videos, setVideos] = useState([]);
  let [selectedVideoId, setSelectedVideoId] = useState('hHW1oY26kxQ');
  let [error, setError] = useState('');

  const api = new YoutubeDataAPI(API_KEY);

  const setVideo = selectedVideoId => {
    setSelectedVideoId(selectedVideoId);
  } 

  const _videoSearch = async term => {
    const options = { q: term, type: 'video' };

    try {
      if (term === '') {
        setVideos([])
        return
      }

      let videos = await api.searchAll(options, 5);
      videos = videos.items.filter(video => video.id.kind !== 'youtube#playlist');
      videos = videos.map(v => {
        let videoId = v.id.videoId;
        let title = v.snippet.title;
        return {videoId, title};
      })
      setVideos(videos);

    } catch (error) {
      setError(error.response.data.error.message);
    }
  }

  const videoSearch = _.debounce((term) => { _videoSearch(term)}, 500);

  const VideoList = () => 
    videos.length !== 0 &&
      <List
        style={{margin: 5}}
        size='small'
        bordered
        dataSource={videos}
        renderItem={video =>
          <List.Item onClick={() => setVideo(video.videoId) }>
            {video.title}
          </List.Item>
        }
      />

  const SearchInput = (
    <div style={{margin: 'auto', width: '95%'}}>
      <Input 
        onChange={event => videoSearch(event.target.value) }
        placeholder='Search YouTube'
      />
    </div>
  )

  return (
    <div style={{margin: 5}}>
      <YouTubeVideo key={selectedVideoId} videoId={selectedVideoId} />
      {SearchInput}
      <Typography style={{color:'#f5222d'}}>{error}</Typography>
      <VideoList />
    </div>
  )
}


const opts = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 1
  }
};

const YouTubeVideo = ({ videoId }) => {
  let [player, setPlayer] = useState(null);

  const onReady = event => {
    setPlayer(event.target);
  }

  return <YouTube videoId={videoId} onReady={onReady} opts={opts}/>
}

export default YouTubePlayer;
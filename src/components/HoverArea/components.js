import React from 'react';
import Chat from 'twilio-chat';
import axios from '../../config/axios';
import YouTube from 'react-youtube';
import { YoutubeDataAPI } from 'youtube-v3-api';
import { List, Typography, Input, Button, Comment, Avatar } from 'antd';
import _ from 'lodash';
import styled from 'styled-components';
const API_KEY = 'AIzaSyDCPJJTkT8pg_m4WoLI7JjmAMbY6F8rNY8';

const { TextArea } = Input;

export const FadeIn = styled.div`
	@keyframes FadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	animation: FadeIn ${props => props.speed || 1}s;
`;

export class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      messages: [],
      newMessage: ''
    };

    this.setupChatClient = this.setupChatClient.bind(this);
    this.messagesLoaded = this.messagesLoaded.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleError = this.handleError.bind(this);

  }

  async componentDidMount() {
    try {
      let token = await axios.post('/chat/token', {'identity': encodeURIComponent(this.props.username)});
      console.log('INSIDE CHAT APP')
      console.log(token);      
      let client = await Chat.create(token.data);
      await this.setupChatClient(client);
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(error) {
    console.error(error);
    this.setState({
      error: 'Could not load chat.'
    });
  }

  setupChatClient(client) {
    this.client = client;
    this.client
      .getChannelByUniqueName(this.props.gameId)
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: this.props.gameId });
        } else {
          this.handleError(error);
        }
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.channel.getMessages().then(this.messagesLoaded);
        this.channel.on('messageAdded', this.messageAdded);
      })
      .catch(this.handleError);
  }

  messagesLoaded(messagePage) {
    this.setState({
      messages: messagePage.items
    });
  }

  messageAdded(message) {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        message
      ]
    }));
  }

  componentWillUnmount() {
    this.client.shutdown();
  }


  sendMessage = (event) => {
    event.preventDefault();
    let msg = this.state.newMessage.replace(/[\r\n]+/gm,"").trim(); 

    if (msg !== '') {
      this.channel.sendMessage(msg);
      this.setState({newMessage: ''});
    }
  }

  
  handleChange = event => {
    console.log('handling change')
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    console.log(this.state.messages)
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return <Typography.Title style={{margin: 5}} level={4}>Loading chat...</Typography.Title>;
    }
    let comments = this.state.messages.map(message =>
      <Comment
        key={message.state.sid}
        avatar={<Avatar size='small'>{message.state.author}</Avatar>}
        content={message.state.body}
      />
    );
    return (
      <React.Fragment>
        <FadeIn style={{
          display: 'flex',
          margin: 5
        }}>
          <TextArea 
              value={this.state.newMessage} 
              placeholder='Enter a message' 
              onChange={(c) => this.handleChange(c)}
              onPressEnter={(e) => this.sendMessage(e)}
              name='newMessage'
              style={{marginTop:3, marginBottom:3}}
            />

          <Button 
            icon='right'
            style={{padding: 3, margin: 3, height: 'auto', backgroundColor:'#003a8c', color:'white'}}
            onClick={(e) => this.sendMessage(e)}
          />
        </FadeIn>

        <FadeIn style={{margin: 5, flexGrow: 1, overflowX: 'hidden', overflow: 'auto'}}>
            {comments.reverse()}
        </FadeIn>
      </React.Fragment>
    );
  }
}



export class YouTubeSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      videos: [],
      selectedVideoId: 'hHW1oY26kxQ',
      newVideoSelected: false,
      error: ''
    };
    this.api = new YoutubeDataAPI(API_KEY);
  }

  setVideo = selectedVideoId => {
    console.log('new video selected');
    console.log(selectedVideoId)
    this.setState({selectedVideoId});
    this.setState({newVideoSelected: true});
  } 

  videoSearch = async term => {
    const options = {
      q: term,
      type: 'video'
    }

    try {

      if (term === '') {
        this.setState({videos:[]});
        return
      }

      let videos = await this.api.searchAll(options, 5);
      console.log(`videos returned`)
      console.log(videos.items)

      videos = videos.items.filter(video => video.id.kind !== 'youtube#playlist')
      console.log(`actual videos`)
      console.log(videos)

      videos = videos.map(v => {
        let videoId = v.id.videoId;
        let title = v.snippet.title;
        return {videoId, title};
      })
      this.setState({videos});

    } catch (error) {
      console.dir(error)
      this.setState({error: error.response.data.error.message})
    }

  }


  render() {

    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 500);

    const { selectedVideoId, newVideoSelected } = this.state;
    console.log('selectedVideoId')
    console.log(selectedVideoId)

    let video;
    if (newVideoSelected) {
      video = <YouTubeVideo key={1} videoId={this.state.selectedVideoId} />
    }
    else if (selectedVideoId !== '') {
      video = <YouTubeVideo key={2} videoId={this.state.selectedVideoId} />
    } 
    else {
      video = null;
    }

    return (
      <div style={{margin: 5}}>

        {video}
        
        <div style={{margin: 'auto', width: '95%'}}>
          <Input 
            onChange={event => videoSearch(event.target.value) }
            placeholder='Search YouTube'
          />
        </div>

        <Typography style={{color:'#f5222d'}}>{this.state.error}</Typography>

        {
          this.state.videos.length !== 0 ?
          <List
            style={{margin: 5}}
            size='small'
            bordered
            dataSource={this.state.videos}
            renderItem={video => {

              console.log('rendering video')
              console.log(video);

              return (
                <List.Item onClick={() => this.setVideo(video.videoId) }>
                  {video.title}
                </List.Item>
              )
            }}
          /> : null
        }
          
      </div>
    )
  }
}


class YouTubeVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: props.videoId,
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
  }

  onReady(event) {
    console.log(`YouTube Player object for videoId: '${this.state.videoId}' has been saved to state.`);
    this.setState({
      player: event.target,
    });
  }

  onPlayVideo() {
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
  }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1
      }
    };

    return <YouTube videoId={this.state.videoId} onReady={this.onReady} opts={opts}/>
  }
}
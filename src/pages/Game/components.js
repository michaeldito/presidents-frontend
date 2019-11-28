
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import PlayerSquare from '../../components/PlayerSquare';
import { Layout, List, Card, Typography, Tag, Input, Button, Comment, Avatar } from 'antd';
import Chat from 'twilio-chat';
import axios from '../../config/axios';
import YouTube from 'react-youtube';
import { YoutubeDataAPI } from 'youtube-v3-api';
import Video from 'twilio-video';

import _ from 'lodash';

const API_KEY = 'AIzaSyDCPJJTkT8pg_m4WoLI7JjmAMbY6F8rNY8';

const { TextArea } = Input;

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
export const GameArea = ({ game, giveDrink, roomName, token, videoLogout }) => {
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
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
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
    this.channel.sendMessage(this.state.newMessage);
    this.setState({newMessage: ''});
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
      return <p>Loading chat...</p>;
    }
    let comments = this.state.messages.map(message =>
      <Comment
        author={message.state.author}
        avatar={<Avatar>{message.state.author[0]}</Avatar>}
        content={message.state.body}
      />
    );
    return (
      <React.Fragment>
        <div>
          <TextArea 
              value={this.state.newMessage} 
              placeholder='Enter a message' 
              onChange={(c) => this.handleChange(c)}
              name='newMessage'
              style={{marginTop:3, marginBottom:3}}
            />

          <Button 
            style={{backgroundColor:'#003a8c', color:'white',marginBottom:3}}
            onClick={() => this.sendMessage()}
          >
            Send
          </Button>
        </div>

        <div style={{height: '60%', overflowX: 'hidden', overflow: 'auto'}}>
            {comments.reverse()}
        </div>
      </React.Fragment>
    );
  }
}

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  handleChange = term => {
    this.setState({term});
    this.props.onSearchTermChange(term);
  } 

  render() {
    return (
      <div>
        <Input 
          value={this.state.term}
          onChange={event => this.handleChange(event.target.value) }
          placeholder='Search YouTube'
        />
      </div>
    );
  }

  
}



export class YouTubeSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

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
      <React.Fragment>

      {video}
      
      <SearchBar onSearchTermChange={videoSearch} />

      <Typography style={{color:'#f5222d'}}>{this.state.error}</Typography>


      {
        this.state.videos.length !== 0 ?
        <List
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
        
      </React.Fragment>
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
      height: '100',
      width: '210',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div>
        <YouTube videoId={this.state.videoId} onReady={this.onReady} opts={opts}/>
        {/* <button onClick={this.onPlayVideo}>Play</button>
        <button onClick={this.onPauseVideo}>Pause</button> */}
      </div>
    );
  }
}
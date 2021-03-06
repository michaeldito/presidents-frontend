import React from "react";
import Chat from "twilio-chat";
import axios from "../../config/axios";
import { Typography, Input, Button, Comment, Avatar } from "antd";
import styled from "styled-components";

const { TextArea } = Input;

export const FadeIn = styled.div`
  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: FadeIn ${props => props.speed || 1}s;
`;

export default class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      messages: [],
      newMessage: ""
    };

    this.setupChatClient = this.setupChatClient.bind(this);
    this.messagesLoaded = this.messagesLoaded.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  async componentDidMount() {
    const { username } = this.props;
    try {
      let token = await axios.post("/chat/token", {
        identity: encodeURIComponent(username)
      });
      let client = await Chat.create(token.data);
      await this.setupChatClient(client);
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(error) {
    this.setState({
      error: "Could not load chat."
    });
  }

  setupChatClient(client) {
    const { gameId } = this.props;
    this.client = client;
    this.client
      .getChannelByUniqueName(gameId)
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: gameId });
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
        this.channel.on("messageAdded", this.messageAdded);
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
      messages: [...prevState.messages, message]
    }));
  }

  componentWillUnmount() {
    this.client.shutdown();
  }

  sendMessage(event) {
    const { newMessage } = this.state;
    event.preventDefault();
    let msg = newMessage.replace(/[\r\n]+/gm, "").trim();

    if (msg !== "") {
      this.channel.sendMessage(msg);
      this.setState({ newMessage: "" });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { error, isLoading, messages, newMessage } = this.state;
    if (error) {
      return <p>{error}</p>;
    } else if (isLoading) {
      return (
        <Typography.Title style={{ margin: 5 }} level={4}>
          Loading chat...
        </Typography.Title>
      );
    }
    let comments = messages.map(message => (
      <Comment
        key={message.state.sid}
        avatar={<Avatar size="small">{message.state.author}</Avatar>}
        content={message.state.body}
      />
    ));
    return (
      <React.Fragment>
        <FadeIn
          style={{
            display: "flex",
            margin: 5
          }}
        >
          <TextArea
            value={newMessage}
            placeholder="Enter a message"
            onChange={c => this.handleChange(c)}
            onPressEnter={e => this.sendMessage(e)}
            name="newMessage"
            style={{ marginTop: 3, marginBottom: 3 }}
          />
          <Button
            icon="right"
            style={{
              padding: 3,
              margin: 3,
              height: "auto",
              backgroundColor: "#003a8c",
              color: "white"
            }}
            onClick={e => this.sendMessage(e)}
          />
        </FadeIn>
        <FadeIn
          style={{
            margin: 5,
            flexGrow: 1,
            overflowX: "hidden",
            overflow: "auto"
          }}
        >
          {comments.reverse()}
        </FadeIn>
      </React.Fragment>
    );
  }
}

import React, { useState } from "react";
import "antd/dist/antd.css";
import axios from "../../config/axios";
import {
  Layout,
  Modal,
  PageHeader,
  Typography,
  List,
  Avatar,
  Card,
  Steps
} from "antd";
import { HoverArea, Chat, YouTubePlayer } from "../../components";
import {
  HoverButtons,
  HoverButton,
  PlayerArea,
  Flex,
  PullLeft,
  PullRight,
  Title,
  HorizontallyScrollable,
  VerticalDivider,
  GameButton,
  Container,
  StepsArea
} from "./components";
import Players from "./Players";
import PlayersHand from "./PlayersHand";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  selectCard,
  playCards,
  pass,
  giveDrink,
  drinkDrink,
  startGame,
  updateGame,
  rematch
} from "./actions";
import Moment from "react-moment";
const { Content } = Layout;
const { Step } = Steps;

const stepNumber = value => {
  switch (value) {
    case "NOT_STARTED":
      return 0;
    case "IN_PROGRESS":
      return 2;
    case "FINALIZED":
      return 3;
    default:
      return 0;
  }
};
const dateToString = date =>
  new Date(date).toLocaleString().replace(/:\d+ /, " ");

const Game = ({
  game,
  user,
  selectCard,
  playCards,
  pass,
  giveDrink,
  drinkDrink,
  startGame,
  rematch
}) => {
  let [visible, setVisible] = useState(true);
  let [hoverArea, setHoverArea] = useState({ open: false, type: "" });
  let [showYourHand, setShowYourHand] = useState(true);
  let [token, setToken] = useState("");

  const toggleHoverArea = type => {
    let open = !hoverArea.open;
    setHoverArea({ open, type });
  };

  const toggleYourHand = () => {
    setShowYourHand(!showYourHand);
  };

  const getVideoToken = async () => {
    let payload = {
      identity: encodeURIComponent(user.username),
      room: game._id
    };
    const token = await axios.post("/video/token", payload);
    setToken(token.data);
  };

  const videoLogout = () => {
    setToken("");
  };

  const rematchHandler = () => {
    rematch();
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const TurnsTaken = () => {
    if (game.turnToBeat !== undefined) {
      let rounds = game.rounds;
      let turns = [];
      rounds.forEach(round => {
        round.turns.forEach(turn => {
          turns.push(turn);
        });
      });
      let users = {};
      game.players.forEach(player => {
        users[player.user._id] = player.user;
      });
      turns = turns.reverse().map(turn => {
        let turnToBeat = game.turnToBeat;
        let style = {
          border: `5px solid ${
            turnToBeat !== null && turn._id === turnToBeat._id ? "#d4380d" : ""
          }`,
          textAlign: "center",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column"
        };
        return (
          <div key={turn._id} style={{ padding: "5px" }}>
            <Card size="small" title={users[turn.user].username} style={style}>
              {turn.wasPassed ? (
                <Typography.Text strong>Pass</Typography.Text>
              ) : turn.wasSkipped ? (
                <Typography.Text strong>Skipped</Typography.Text>
              ) : (
                turn.cardsPlayed.map(card => (
                  <Typography.Text
                    style={{ display: "flex", margin: 2 }}
                    code
                    key={card._id}
                  >
                    {card.cardRank.character} {card.suit.character}
                  </Typography.Text>
                ))
              )}
            </Card>
          </div>
        );
      });

      return turns;
    }
    return null;
  };

  const Drinks = () => {
    if (game.drinks !== undefined && game.drinks.length > 0) {
      return game.drinks.reverse().map((drink, idx) => {
        let drinks;
        if (drink.type === "drink given") {
          drinks = (
            <div key={idx} style={{ padding: "5px" }}>
              <Card size="small" title="Drink Given">
                <Typography>{`From ${drink.from}`}</Typography>
                <Typography>{`To ${drink.to}`}</Typography>
              </Card>
            </div>
          );
        } else {
          // drink.type === 'drink drunk'
          drinks = (
            <div key={idx} style={{ padding: "5px" }}>
              <Card size="small" title="Drink Drunk">
                {`By ${drink.user}`}
              </Card>
            </div>
          );
        }
        return drinks;
      });
    }
    return null;
  };

  const GameOverResults = () => {
    const description = ({ politicalRank }) => {
      return politicalRank === undefined
        ? `Started as nothing`
        : politicalRank.name === "Asshole"
        ? `Sharted from the bottom`
        : `Started as ${politicalRank.name}`;
    };

    let results = (
      <List
        itemLayout="horizontal"
        dataSource={game.players}
        renderItem={player => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{player.user.username[0].toUpperCase()}</Avatar>}
              title={player.user.username}
              description={description(player)}
            />
            <div>{player.nextGameRank.name}</div>
          </List.Item>
        )}
      />
    );

    return results;
  };

  const statusValue = () =>
    game.status !== undefined ? game.status.value : "";
  const createdTime = dateToString(game.createdAt);
  const startTime = dateToString(game.startedAt);

  const GameOverModal = () => (
    <Modal
      title="Game Complete"
      visible={statusValue() === "FINALIZED" && visible}
      onOk={handleOk}
      mask={true}
    >
      {statusValue() === "FINALIZED" && visible && <GameOverResults />}
    </Modal>
  );

  const GamePageHeader = () => (
    <PageHeader
      title={`Presidents`}
      subTitle={game.name + " - " + user.username}
    />
  );

  const GameProgress = () => (
    <StepsArea>
      <Steps current={stepNumber(statusValue())}>
        <Step title="Created" subTitle={createdTime} />
        <Step title="Started" subTitle={startTime} />
        <Step
          title="In Progress"
          subTitle={<Moment date={game.startedAt} durationFromNow />}
        />
        <Step title="Complete" />
      </Steps>
    </StepsArea>
  );

  const ActionButtons = () => (
    <Container>
      <Title value="Actions" />
      {statusValue() === "NOT_STARTED" && (
        <GameButton title="Start" action={startGame} icon="rollback" />
      )}
      {statusValue() === "FINALIZED" && (
        <GameButton title="Rematch" action={rematchHandler} icon="rollback" />
      )}
      <GameButton
        icon="play-circle"
        action={() => playCards(game._id, game.selectedCards)}
        title="Play Cards"
      />
      <GameButton icon="forward" action={() => pass()} title="Pass" />
      <GameButton icon="coffee" action={() => drinkDrink()} title="Drink" />
    </Container>
  );

  const YourHand = (
    <Container>
      <span style={{ cursor: "pointer" }} onClick={() => toggleYourHand()}>
        <Title value="Your Hand" />
      </span>
      {showYourHand && (
        <PlayersHand
          cards={game.playersHand}
          selectedCards={game.selectedCards}
          selectCard={selectCard}
        />
      )}
    </Container>
  );

  const TurnsAndDrinks = () => (
    <Container>
      <Flex>
        <PullLeft>
          <Title value="Turns" />
          <HorizontallyScrollable>
            <TurnsTaken />
          </HorizontallyScrollable>
        </PullLeft>
        <VerticalDivider />
        <PullRight>
          <Title value="Drinks" />
          <HorizontallyScrollable>
            <Drinks />
          </HorizontallyScrollable>
        </PullRight>
      </Flex>
    </Container>
  );

  const Larrys = (
    <PlayerArea>
      <Title value="Larrys" />
      <Players
        game={game}
        giveDrink={giveDrink}
        roomName={game._id}
        token={token}
      />
    </PlayerArea>
  );

  const Hover = () =>
    hoverArea.open && (
      <HoverArea
        username={user.username}
        gameId={game._id}
        settings={hoverArea}
      >
        {hoverArea.type === "youtube" ? (
          <YouTubePlayer />
        ) : (
          <Chat username={user.username} gameId={game._id} />
        )}
      </HoverArea>
    );

  const HoverActionButtons = (
    <HoverButtons>
      <HoverButton
        title="Chat"
        icon="wechat"
        onClick={() => toggleHoverArea("chat")}
      />
      {token === "" ? (
        <HoverButton
          title="Video Chat"
          icon="video-camera"
          onClick={() => getVideoToken()}
        />
      ) : (
        <HoverButton
          title="Video Chat"
          icon="video-camera"
          onClick={() => videoLogout()}
        />
      )}
      <HoverButton
        title="YouTube"
        icon="youtube"
        onClick={() => toggleHoverArea("youtube")}
      />
    </HoverButtons>
  );

  return (
    <Layout>
      <GameOverModal />
      <Layout>
        <GamePageHeader />
        <Content>
          <GameProgress />
          <ActionButtons />
          {YourHand}
          <TurnsAndDrinks />
          {Larrys}
          <Hover />
          {/* {HoverActionButtons} */}
        </Content>
      </Layout>
    </Layout>
  );
};

function mapStateToProps(state) {
  const { game, user } = state;
  if (game.status && game.status.value === "IN_PROGRESS") {
    let player = game.players.find(player => player.user._id === user._id);
    game.playersHand = player.hand;
  }
  return { game, user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectCard,
      playCards,
      pass,
      giveDrink,
      drinkDrink,
      startGame,
      updateGame,
      rematch
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

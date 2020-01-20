import React from "react";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";

const calculateColor = value => {
  switch (value) {
    case "NOT_STARTED":
      return "green";
    case "IN_PROGRESS":
      return "blue";
    case "FINALIZED":
      return "volcano";
    default:
      return "geekblue";
  }
};

const ActionButton = ({ name, id, action }) => {
  return (
    <Link to="/game">
      <Button onClick={() => action(id)}>{name}</Button>
    </Link>
  );
};

export const SearchTable = ({
  data,
  alreadyJoinedGames,
  joinGame,
  getGame
}) => {
  const columns = [
    {
      title: "Action",
      key: "id",
      render: game => {
        let userHasJoined = alreadyJoinedGames.find(
          joinedGame => joinedGame === game.id
        );
        if (
          userHasJoined &&
          (game.status.value === "IN_PROGRESS" ||
            game.status.value === "NOT_STARTED")
        ) {
          return <ActionButton name="Go" id={game.id} action={getGame} />;
        } else if (!userHasJoined && game.status.value === "NOT_STARTED") {
          return <ActionButton name="Join" id={game.id} action={joinGame} />;
        } else if (userHasJoined && game.status.value === "FINALIZED") {
          return <ActionButton name="Review" id={game.id} action={getGame} />;
        }
        return <ActionButton name="Watch" id={game.id} action={getGame} />;
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <div>{text}</div>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => {
        let { value } = status;
        let color = calculateColor(value);
        return (
          <Tag color={color} key={status}>
            {status.value.toUpperCase().replace(/_/g, " ")}
          </Tag>
        );
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: text => <div>{text}</div>
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: text => <div>{new Date(text).toLocaleDateString("en-US")}</div>
    }
  ];

  return (
    <React.Fragment>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="name"
      />
    </React.Fragment>
  );
};

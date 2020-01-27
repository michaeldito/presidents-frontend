import React, { useEffect } from "react";
import "antd/dist/antd.css";
import {
  Layout,
  PageHeader,
  Descriptions,
  Tabs,
  Table,
  Divider,
  Tag
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUserGamesPlayed } from "./actions";
const { TabPane } = Tabs;

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

const Visualizations = ({ data }) => (
  <LineChart
    width={600}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="Games"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
    />
  </LineChart>
);

const columns = [
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
      let color = calculateColor(status.value);
      return (
        <Tag color={color} key={status}>
          {status.value.toUpperCase().replace(/_/g, " ")}
        </Tag>
      );
    }
  },
  {
    title: "Kind",
    dataIndex: "kind",
    key: "kind",
    render: text => <div>{text}</div>
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: text => <div>{new Date(text).toLocaleDateString("en-US")}</div>
  },
  {
    title: "Rank Earned",
    dataIndex: "player",
    key: "player",
    render: player => (
      <div>
        {player && player.nextGameRank !== undefined
          ? player.nextGameRank.name
          : "-"}
      </div>
    )
  }
];

const Dashboard = ({
  user,
  lineChartData,
  gameHistory,
  getUserGamesPlayed
}) => {
  useEffect(() => {
    getUserGamesPlayed();
  }, []);
  const handleTabChange = key => {
    if (key === "Visualizations") {
      getUserGamesPlayed();
    }
  };
  return (
    <Layout>
      <PageHeader title="Dashboard" />
      <Layout.Content style={{ padding: "10px" }}>
        <Descriptions title="User">
          <Descriptions.Item label="UserName">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Games Played">
            {user.gamesPlayed.length}
          </Descriptions.Item>
        </Descriptions>

        <Tabs onChange={key => handleTabChange(key)}>
          <TabPane tab="Visualizations" key="Visualizations">
            <Visualizations data={lineChartData} />
          </TabPane>

          <TabPane tab="Game History" key="Game History">
            <Table
              columns={columns}
              dataSource={gameHistory.gamesPlayed}
              pagination={false}
              rowKey="name"
            />
          </TabPane>
        </Tabs>
      </Layout.Content>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    lineChartData: state.dashboard.lineChartData,
    gameHistory: state.dashboard.gameHistory || { gamesPlayed: [] },
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserGamesPlayed
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

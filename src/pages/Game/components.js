import React from "react";
import "antd/dist/antd.css";
import { Tooltip, Button, Typography, Divider, Tag } from "antd";
import styled from "styled-components";

export const HoverButtons = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: 16px;
`;

export const PlayerArea = styled.div`
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #fff;
`;

export const Container = styled.div`
  padding: 20px;
  margin-top: 10px;
  background: #fff;
`;

export const StepsArea = styled.div`
  padding: 20px;
  background: #fff;
`;

export const Flex = styled.div`
  display: flex;
`;

export const PullLeft = styled.div`
  float: left;
  width: 50%;
`;

export const PullRight = styled.div`
  float: right;
  width: 50%;
`;

export const HorizontallyScrollable = styled.div`
  height: 100%;
  overflow-y: hidden;
  overflow: scroll;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

export const HoverButton = ({ title, icon, onClick }) => (
  <Tooltip placement="top" title={title}>
    <Button
      style={{ marginLeft: 2 }}
      icon={icon}
      shape="circle"
      onClick={() => onClick()}
    />
  </Tooltip>
);

export const Title = ({ value, children }) => (
  <Typography.Title level={4} style={{ margin: 10 }}>
    {value}
    {children}
  </Typography.Title>
);

export const VerticalDivider = () => (
  <div style={{ float: "none", width: "2" }}>
    <Divider type="vertical" style={{ height: "100%" }} />
  </div>
);

export const GameButton = ({ icon, action, title }) => (
  <Button
    onClick={() => action()}
    icon={icon}
    style={{ margin: 10 }}
    type="primary"
  >
    {title}
  </Button>
);

export const CenteredTitle = ({ value }) => (
  <Typography.Title level={4} style={{ textAlign: "center" }}>
    {value}
  </Typography.Title>
);

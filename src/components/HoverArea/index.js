import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import ReactDOM from "react-dom";

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

const HoverArea = ({ children }) => {
  let _root = document.getElementById("hover-area-root");

  let content = (
    <FadeIn
      style={{
        position: "fixed",
        top: "15px",
        right: "28px",
        border: "1px solid #505370",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "2px",
        zIndex: 999,
        maxHeight: "88%",
        maxWidth: "25%",
        overflowX: "hidden",
        overflow: "scroll",
        display: "flex",
        flexFlow: "column"
      }}
    >
      {children}
    </FadeIn>
  );
  return ReactDOM.createPortal(content, _root);
};

export default HoverArea;

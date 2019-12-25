import React, { useState } from "react";
import "antd/dist/antd.css";
import { Tabs, Radio } from "antd";
const { TabPane } = Tabs;

export const InstanceTabs = () => {
  let [mode, setMode] = useState('top');

  const handleModeChange = e => {
    const mode = e.target.value;
    setMode(mode);
  };

  return (
    <div>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
      >
        {[...Array(30).keys()].map(i => (
          <TabPane tab={`Tab-${i}`} key={i}>
            Content of tab {i}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
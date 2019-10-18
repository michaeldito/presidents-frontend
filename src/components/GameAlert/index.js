
import React from 'react';
import 'antd/dist/antd.css';
import { Alert } from 'antd';


// TODO:
// convert to function
export default class GameAlert extends React.Component {
  state = {
    visible: true,
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    let {message, description, type} = this.props;

    return (
      <div>
        {this.state.visible ? (
          <Alert
            message={message}
            description={description}
            type={type}
            closable
            afterClose={this.handleClose}
          />
        ) : null}
      </div>
    );
  }
}
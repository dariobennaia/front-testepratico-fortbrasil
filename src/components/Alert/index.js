import React from 'react';
import './style.css';

class Alert extends React.Component {
  render() {
    const { alertType, alertMsg } = this.props;// eslint-disable-line

    return <div className={`alert ${alertType}`}>{alertMsg}</div>;
  }
}

export default Alert;

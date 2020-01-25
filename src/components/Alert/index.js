import React from 'react';
import './style.css';

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { alertType, alertMsg } = this.props;

    return <div className={`alert ${alertType}`}>{alertMsg}</div>;
  }
}

export default Alert;

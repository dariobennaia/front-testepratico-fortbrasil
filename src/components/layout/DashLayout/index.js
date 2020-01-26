import React from 'react';
import './style.css';

class DashLayout extends React.Component {
  render() {
    const { children } = this.props;// eslint-disable-line
    return <div id="app">{children}</div>;
  }
}

export default DashLayout;

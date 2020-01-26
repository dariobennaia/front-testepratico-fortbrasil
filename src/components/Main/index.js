import React from 'react';
import './style.css';

class Main extends React.Component {
  render() {
    const { children } = this.props;// eslint-disable-line

    return <main>{children}</main>;
  }
}

export default Main;

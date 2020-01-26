import React from 'react';
import './style.css';

class Sidebar extends React.Component {
  render() {
    const { children } = this.props;// eslint-disable-line

    return <aside>{children}</aside>;
  }
}

export default Sidebar;

import React from 'react';
import './style.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return <aside>{children}</aside>;
  }
}

export default Sidebar;

import React from 'react';
import './style.css';

class DashLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div id="app">
        <main>{children}</main>
      </div>
    );
  }
}

export default DashLayout;

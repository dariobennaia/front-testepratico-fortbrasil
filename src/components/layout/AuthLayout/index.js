import React from 'react';
import './style.css';

class AuthLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return <div id="auth">{children}</div>;
  }
}

export default AuthLayout;

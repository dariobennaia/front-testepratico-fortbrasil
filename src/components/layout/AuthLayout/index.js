import React from 'react';
import './style.css';

class AuthLayout extends React.Component {
  render() {
    const { children } = this.props;// eslint-disable-line

    return <div id="auth">{children}</div>;
  }
}

export default AuthLayout;

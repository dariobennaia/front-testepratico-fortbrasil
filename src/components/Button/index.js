import React from 'react';
import './style.css';

class Button extends React.Component {
  render() {
    const { buttonType, buttonName, buttonClass, onClick } = this.props;// eslint-disable-line

    return (
      <button
        type={buttonType}
        className={`btn-block ${buttonClass}`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    );
  }
}

export default Button;

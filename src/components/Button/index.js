import React from 'react';
import './style.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { buttonType, buttonName, buttonClass, onClick } = this.props;

    return (
      <button type={buttonType} className={buttonClass} onClick={onClick}>
        {buttonName}
      </button>
    );
  }
}

export default Button;

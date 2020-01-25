import React from 'react';
import './style.css';

class InputGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inputId, inputType, inputTitle, model } = this.props;

    return (
      <div className="input-block">
        <label htmlFor={inputId}>{inputTitle}</label>
        <input type={inputType} id={inputId} onChange={model} />
      </div>
    );
  }
}

export default InputGroup;

import React from 'react';
import './style.css';

class InputGroup extends React.Component {
  render() {
    const {
      inputId,// eslint-disable-line
      inputType,// eslint-disable-line
      inputTitle,// eslint-disable-line
      inputChange = () => {},// eslint-disable-line
      inputClick = () => {},// eslint-disable-line
      inputValue,// eslint-disable-line
      inputDisabled = false,// eslint-disable-line
      inputAutoFocus = false,// eslint-disable-line
      inputAutoComplete = 'off'// eslint-disable-line
    } = this.props;

    return (
      <div className="input-block">
        <label htmlFor={inputId}>{inputTitle}</label>
        {(inputType === 'checkbox' && (
          <div className="input-block-checkbox">
            <input
              type={inputType}
              id={inputId}
              onChange={inputChange}
              defaultChecked={inputValue}
              disabled={inputDisabled}
            />
          </div>
        )) || (
          <input
            type={inputType}
            id={inputId}
            onChange={inputChange}
            onClick={inputClick}
            value={inputValue}
            disabled={inputDisabled}
            autoFocus={inputAutoFocus}
            autoComplete={inputAutoComplete}
          />
        )}
      </div>
    );
  }
}

export default InputGroup;

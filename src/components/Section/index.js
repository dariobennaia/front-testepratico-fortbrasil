import React from 'react';
import './style.css';

class Section extends React.Component {
  render() {
    const { title, children } = this.props;// eslint-disable-line

    return (
      <section className="form-section">
        <h1>{title}</h1>
        {children}
      </section>
    );
  }
}

export default Section;

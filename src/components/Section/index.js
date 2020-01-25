import React from 'react';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, children } = this.props;

    return (
      <section className="form-section">
        <h1>{title}</h1>
        {children}
      </section>
    );
  }
}

export default App;

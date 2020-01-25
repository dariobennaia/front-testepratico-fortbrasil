import React from 'react';
import api from '../../services/api';
import DashLayout from '../../components/layout/DashLayout';
import Sidebar from '../../components/Sidebar';
import InputGroup from '../../components/InputGroup';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await api.get('/shops');
  }

  render() {
    return (
      <DashLayout>
        <Sidebar></Sidebar>
      </DashLayout>
    );
  }
}

export default Home;

import React from 'react';
import './style.css';
import { IoIosLogOut } from 'react-icons/io';
import api from '../../services/api';

class ButtonLogout extends React.Component {
  handleLogout = async () => {
    await api.delete('logout').then(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location = '/login';
    });
  };

  render() {
    return (
      <button className="button-logout" onClick={this.handleLogout}>
        Sair <IoIosLogOut />
      </button>
    );
  }
}

export default ButtonLogout;

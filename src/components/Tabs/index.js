import React from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';

class Tabs extends React.Component {
  handleLogout = async () => {
    await api.delete('logout').then(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location = '/login';
    });
  };

  handleChangePage = page => {
    this.props.history.push(page);// eslint-disable-line
  };

  render() {
    const { activeShops, activeMaps } = this.props;// eslint-disable-line
    return (
      <div className="tab">
        <button
          className={`tablinks ${activeShops}`}
          onClick={() => this.handleChangePage('/shops')}
        >
          Cadastrar
        </button>
        <button
          className={`tablinks ${activeMaps}`}
          onClick={() => this.handleChangePage('/shops/maps')}
        >
          Pesquisar
        </button>
        <button className="tablinks" onClick={this.handleLogout}>
          Sair
        </button>
      </div>
    );
  }
}

export default withRouter(Tabs);

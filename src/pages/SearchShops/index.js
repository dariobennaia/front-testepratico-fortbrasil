import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';
import { AiOutlineShop } from 'react-icons/ai';
import api from '../../services/api';
import DashLayout from '../../components/layout/DashLayout';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import InputGroup from '../../components/InputGroup';
import ShopsListMaps from '../../components/ShopsListMaps';
import ButtonLogout from '../../components/ButtonLogout';

class SearchShops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        showRadius: true,
        distance: 10000,
        strokeColor: '#ff0000'
      },
      shops: []
    };
  }

  componentDidMount() {
    this.handleCurrentPosition();
  }

  handleSearch = async () => {
    const { distance = 10, name, latitude, longitude } = this.state.form;
    const { data } = await api.get(
      `shops/distance-of/${distance}?name=${name}&latitude=${latitude}&longitude=${longitude}`
    );
    this.setState({ shops: data });
  };

  handleCurrentPosition = () => {
    const { form } = this.state;
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      form.latitude = latitude;
      form.longitude = longitude;
      this.setState(form);
      this.handleSearch();
    });
  };

  handleChangeValueInput = e => {
    const { value, id, checked, type } = e.target;
    const { form } = this.state;
    if (type === 'checkbox') {
      form[id] = checked;
    } else {
      form[id] = (type === 'number' && Number(value)) || value;
    }
    this.setState(form);
    this.handleSearch();
  };

  render() {
    const { form, shops } = this.state;
    return (
      <DashLayout>
        <Sidebar>
          <div>
            <Link to="/shops" className="menu-option">
              Gerênciar Lojas <AiOutlineShop />
            </Link>
            <ButtonLogout />
          </div>
          <form>
            <InputGroup
              inputId="name"
              inputTitle="Nome loja"
              inputType="text"
              inputChange={this.handleChangeValueInput}
              inputValue={form.name || ''}
              inputAutoFocus={true}
            />
            <InputGroup
              inputId="distance"
              inputTitle="Qual a distancia (em metros)?"
              inputType="number"
              inputChange={this.handleChangeValueInput}
              inputValue={form.distance || 1}
            />
            <InputGroup
              inputId="showRadius"
              inputTitle="Mostrar raio"
              inputType="checkbox"
              inputChange={this.handleChangeValueInput}
              inputValue={form.showRadius || 'off'}
            />
          </form>
        </Sidebar>
        <Main>
          <div className="maps">
            <ShopsListMaps shops={shops} radius={form} />
          </div>
        </Main>
      </DashLayout>
    );
  }
}

export default SearchShops;

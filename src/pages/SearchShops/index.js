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
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import ShopsList from '../../components/ShopsList';
import InputGroupAutocomplete from '../../components/InputGroupAutocomplete';

class SearchShops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        showRadius: true,
        distance: 10000,
        strokeColor: '#ff0000',
        showMap: true
      },
      shops: [],
      alert: {}
    };
  }

  componentDidMount() {
    this.handleCurrentPosition();
    this.handleShowAlert('success', 'asdasdasdasd');
  }

  handleShowAlert = (type, msg) => {
    this.setState({
      alert: {
        show: true,
        type,
        msg
      }
    });
    setTimeout(() => {
      this.setState({ alert: { show: false } });
    }, 10000);
  };

  handleSearch = async () => {
    const { distance = 10, name, latitude, longitude } = this.state.form;
    const { data } = await api.get(
      `shops/distance-of/${distance}?name=${name}&latitude=${latitude}&longitude=${longitude}`
    );

    if (data.length === 0) {
      this.handleShowAlert('danger', 'Nenhuma loja encontrada!');
    }

    return this.setState({ shops: data });
  };

  handleCurrentPosition = () => {
    const { form } = this.state;
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        form.latitude = latitude;
        form.longitude = longitude;
        this.setState(form);
        this.handleSearch();
      },
      () => {
        this.handleShowAlert('danger', 'Habilite sua localização');
        form.showMap = false;
        this.setState(form);
        this.handleSearch();
      }
    );
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
  };

  handleSelectAddress = ({ lat, lng }) => {
    const { form } = this.state;
    form.latitude = lat;
    form.longitude = lng;
    this.setState(form);
    this.handleSearch();
  };

  render() {
    const { form, shops, alert } = this.state;
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
            {alert.show && (
              <Alert alertType={alert.type} alertMsg={alert.msg} />
            )}
            <InputGroup
              inputId="name"
              inputTitle="Informe o nome da loja"
              inputType="text"
              inputChange={this.handleChangeValueInput}
              inputValue={form.name || ''}
              inputAutoFocus={true}
            />
            <InputGroup
              inputId="distance"
              inputTitle="Qual a distância (em metros)?"
              inputType="number"
              inputChange={this.handleChangeValueInput}
              inputValue={form.distance || 1}
            />
            {(!form.latitude || !form.longitude) && (
              <InputGroupAutocomplete
                inputId="address"
                inputTitle="Ops! não achamos sua localização, poderia nos informar?"
                inputType="text"
                onSelected={this.handleSelectAddress}
              />
            )}
            <InputGroup
              inputId="showMap"
              inputTitle="Mostrar mapa"
              inputType="checkbox"
              inputChange={this.handleChangeValueInput}
              inputChecked={form.showMap || false}
              inputDisabled={!form.showMap && !form.latitude}
            />
            {form.showMap && (
              <InputGroup
                inputId="showRadius"
                inputTitle="Mostrar raio"
                inputType="checkbox"
                inputChange={this.handleChangeValueInput}
                inputChecked={form.showRadius || false}
              />
            )}
            <Button
              buttonType="button"
              buttonName="Pesquisar"
              buttonClass="btn-success"
              onClick={this.handleSearch}
              buttonDisabled={!form.latitude || !form.longitude}
            />
          </form>
        </Sidebar>
        <Main>
          {form.showMap && (
            <div className="maps">
              <ShopsListMaps
                shops={shops}
                radius={form}
                currentPosition={form}
              />
            </div>
          )}
          {!form.showMap && <ShopsList shops={shops} options={false} />}
        </Main>
      </DashLayout>
    );
  }
}

export default SearchShops;

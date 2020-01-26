import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';
import { FaMapMarkedAlt } from 'react-icons/fa';
import api from '../../services/api';
import DashLayout from '../../components/layout/DashLayout';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import InputGroup from '../../components/InputGroup';
import InputGroupAutocomplete from '../../components/InputGroupAutocomplete';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import ShopsList from '../../components/ShopsList';
import ButtonLogout from '../../components/ButtonLogout';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        about: '',
        latitude: '',
        longitude: ''
      },
      alert: {},
      shops: []
    };
  }

  componentDidMount() {
    this.handleLoadShops();
  }

  handleLoadShops = async () => {
    const { data } = await api.get('/shops');
    this.setState({ shops: data });
  };

  handleChangeValueInput = e => {
    const { value, id } = e.target;
    const { form } = this.state;
    form[id] = value;
    this.setState(form);
  };

  handleSelectAddress = ({ lat, lng }) => {
    const { form } = this.state;
    form.latitude = lat;
    form.longitude = lng;
    this.setState(form);
  };

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
    }, 5000);
  };

  handleClearForm = () => {
    this.setState({ form: {} });
  };

  handleSave = async e => {
    e.preventDefault();
    try {
      const { _id, ...formData } = this.state.form;

      if (_id) {
        await api.patch(`/shops/${_id}`, formData);
      } else {
        await api.post('/shops', formData);
      }
      this.handleClearForm();
      this.handleLoadShops();
      return this.handleShowAlert('success', 'Sucesso');
    } catch (err) {
      const { data, status } = err.response;
      if (status === 422) {
        const msg = data.errors.map((value, id) => {
          return <li key={id}>{value.msg}</li>;
        });
        return this.handleShowAlert('danger', msg);
      }
      return this.handleShowAlert('danger', data.msg);
    }
  };

  handleEditShop = async data => {
    const { _id, name, about, location } = data;
    this.setState({
      form: {
        _id,
        name,
        about,
        latitude: location.coordinates[1],
        longitude: location.coordinates[0]
      }
    });
  };

  render() {
    const { form, alert, shops } = this.state;
    return (
      <DashLayout>
        <Sidebar>
          <div>
            <Link to="/shops/maps" className="menu-option">
              Ver no mapa <FaMapMarkedAlt />
            </Link>
            <ButtonLogout />
          </div>
          <form>
            {alert.show && (
              <Alert alertType={alert.type} alertMsg={alert.msg} />
            )}
            <InputGroup
              inputId="name"
              inputTitle="Nome loja"
              inputType="text"
              inputChange={this.handleChangeValueInput}
              inputValue={form.name || ''}
              inputAutoFocus={true}
            />
            <InputGroup
              inputId="about"
              inputTitle="Descrição (sobre)"
              inputType="text"
              inputChange={this.handleChangeValueInput}
              inputValue={form.about || ''}
            />
            <InputGroupAutocomplete
              inputId="address"
              inputTitle="Endereço"
              inputType="text"
              onSelected={this.handleSelectAddress}
            />
            <InputGroup
              inputId="latitude"
              inputTitle="Latitude"
              inputType="number"
              inputValue={form.latitude || ''}
              inputDisabled={true}
            />
            <InputGroup
              inputId="longitude"
              inputTitle="Longitude"
              inputType="number"
              inputValue={form.longitude || ''}
              inputDisabled={true}
            />
            <div className="buttons-actions">
              <Button
                buttonType="success"
                buttonName="Salvar"
                buttonClass="success"
                onClick={this.handleSave}
              />
              <Button
                buttonType="button"
                buttonName="Limpar"
                buttonClass="warning"
                onClick={this.handleClearForm}
              />
            </div>
          </form>
        </Sidebar>
        <Main>
          <ShopsList shops={shops} shopSelected={this.handleEditShop} />
        </Main>
      </DashLayout>
    );
  }
}

export default Home;

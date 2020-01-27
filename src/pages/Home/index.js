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
        longitude: '',
        address: false
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
      this.setState({ disableForm: true });
      const { _id, ...formData } = this.state.form;

      if (_id) {
        await api.patch(`/shops/${_id}`, formData);
      } else {
        await api.post('/shops', formData);
      }
      this.handleClearForm();
      this.handleLoadShops();
      this.setState({ disableForm: false });
      return this.handleShowAlert('success', 'Sucesso');
    } catch (err) {
      this.setState({ disableForm: false });
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

  handleDeleteShop = async id => {
    if (!window.confirm('Você tem certeza que deseja excluir?')) {
      return false;
    }
    await api.delete(`/shops/${id}`);
    return this.handleLoadShops();
  };

  render() {
    const { form, alert, shops, disableForm } = this.state;
    return (
      <DashLayout>
        <Sidebar>
          <div>
            <Link to="/shops/maps" className="menu-option">
              Lojas proximas a você <FaMapMarkedAlt />
            </Link>
            <ButtonLogout />
          </div>
          <form onSubmit={this.handleSave}>
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
              inputId="about"
              inputTitle="Informe uma descrição para loja"
              inputType="text"
              inputChange={this.handleChangeValueInput}
              inputValue={form.about || ''}
            />
            <InputGroup
              inputId="address"
              inputTitle="Por endereço"
              inputType="checkbox"
              inputChange={this.handleChangeValueInput}
              inputChecked={form.address}
            />
            {(form.address && (
              <InputGroupAutocomplete
                inputId="address"
                inputTitle="Informe o endereço da loja"
                inputType="text"
                onSelected={this.handleSelectAddress}
              />
            )) || (
              <>
                <InputGroup
                  inputId="latitude"
                  inputTitle="Latitude"
                  inputType="number"
                  inputValue={form.latitude || ''}
                  inputChange={this.handleChangeValueInput}
                />
                <InputGroup
                  inputId="longitude"
                  inputTitle="Longitude"
                  inputType="number"
                  inputChange={this.handleChangeValueInput}
                  inputValue={form.longitude || ''}
                />
              </>
            )}
            <div className="buttons-actions">
              <Button
                buttonType="submit"
                buttonName="Salvar"
                buttonClass="btn-success"
                buttonDisabled={disableForm}
              />
              <Button
                buttonType="button"
                buttonName="Limpar"
                buttonClass="btn-warning"
                onClick={this.handleClearForm}
                buttonDisabled={disableForm}
              />
            </div>
          </form>
        </Sidebar>
        <Main>
          <ShopsList
            shops={shops}
            shopEdit={this.handleEditShop}
            shopDelete={this.handleDeleteShop}
          />
        </Main>
      </DashLayout>
    );
  }
}

export default Home;

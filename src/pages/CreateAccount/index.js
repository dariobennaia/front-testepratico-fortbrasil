import React from 'react';
import './style.css';
import { Link, withRouter } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Alert from '../../components/Alert';
import SectionLogin from '../../components/Section';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Squares from '../../components/effects/Squares';
import api from '../../services/api';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',

      alert: {}
    };
  }

  handleChangeValueInput = e => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
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
    }, 3000);
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { name, email, password } = this.state;
      const { data } = await api.post('/users', { name, email, password });
      this.handleShowAlert('success', 'Sucesso!');
      setTimeout(() => {
        this.props.history.push('/login');// eslint-disable-line
      }, 1500);
      return data;
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

  render() {
    const { alert } = this.state;
    return (
      <AuthLayout>
        <SectionLogin title="CRIAR CONTA">
          <form onSubmit={this.handleSubmit}>
            {alert.show && (
              <Alert alertType={alert.type} alertMsg={alert.msg} />
            )}
            <InputGroup
              inputType="text"
              inputTitle="Nome"
              inputId="name"
              inputChange={this.handleChangeValueInput}
              inputAutoFocus={true}
            />
            <InputGroup
              inputType="email"
              inputTitle="E-mail"
              inputId="email"
              inputChange={this.handleChangeValueInput}
            />
            <InputGroup
              inputType="password"
              inputTitle="Senha"
              inputId="password"
              inputChange={this.handleChangeValueInput}
            />
            <Button
              buttonClass="btn-create-account btn-success"
              buttonName="Criar conta"
              buttonType="submit"
            />
            <div className="info-bottom">
              <Link to="/login">Já tenho uma conta</Link>
            </div>
          </form>
        </SectionLogin>

        <Squares />
      </AuthLayout>
    );
  }
}

export default withRouter(CreateAccount);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.css';
import AuthLayout from '../../components/layout/AuthLayout';
import Alert from '../../components/Alert';
import SectionLogin from '../../components/Section';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import Squares from '../../components/effects/Squares';
import api from '../../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const { email, password } = this.state;
      const { data } = await api.post('/login', { email, password });
      sessionStorage.setItem('token', JSON.stringify(data.token));
      sessionStorage.setItem('user', JSON.stringify(data.user));
      setTimeout(() => {
        window.location = '/shops';
        // this.props.history.push('/');// eslint-disable-line
      }, 1000);
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
        <SectionLogin title="LOGIN">
          <form onSubmit={this.handleSubmit}>
            {alert.show && (
              <Alert alertType={alert.type} alertMsg={alert.msg} />
            )}
            <InputGroup
              inputType="email"
              inputTitle="E-mail"
              inputId="email"
              inputChange={this.handleChangeValueInput}
              inputAutoFocus={true}
            />
            <InputGroup
              inputType="password"
              inputTitle="Senha"
              inputId="password"
              inputChange={this.handleChangeValueInput}
            />
            <Button
              buttonClass="btn-login"
              buttonName="Login"
              buttonType="submit"
            />
            <div className="info-bottom">
              <Link to="/create-account">Não tem uma conta?</Link>
              <Link to="/reset-password">Esqueci a senha</Link>
            </div>
          </form>
        </SectionLogin>

        <Squares />
      </AuthLayout>
    );
  }
}

export default withRouter(Login);

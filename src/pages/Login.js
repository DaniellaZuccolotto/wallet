import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionSaveUser } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  handleButton = () => {
    const { email, password } = this.state;
    const NUMBER_SIX = 6;
    if (this.validateEmail(email) && password.length >= NUMBER_SIX) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  // função pesquisada na: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onClick = () => {
    const { history, sendUser } = this.props;
    const { email } = this.state;
    sendUser(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <h2>Faça seu Login</h2>
        <label htmlFor="input-email">
          Email:
          <input
            onChange={ this.handleChange }
            type="email"
            name="email"
            data-testid="email-input"
            id="input-email"
            value={ email }
          />
        </label>
        <label htmlFor="input-password">
          Senha:
          <input
            onChange={ this.handleChange }
            type="password"
            name="password"
            data-testid="password-input"
            id="input-password"
            value={ password }
          />
        </label>
        <button
          type="button"
          name="disabled"
          disabled={ disabled }
          onClick={ this.onClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUser: (email) => dispatch(actionSaveUser(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

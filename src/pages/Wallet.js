import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchApi } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <main>
        <header>
          <h2>TrybeWallet</h2>
          <p data-testid="email-field">{`Email:${email}`}</p>
          <p data-testid="total-field">Despesa total: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="input-value">
            Valor:
            <input
              onChange={ this.handleChange }
              type="number"
              name="valorGasto"
              data-testid="value-input"
              id="input-value"
              // value={ valorGasto }
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              onChange={ this.handleChange }
              type="number"
              name="descricao"
              data-testid="description-input"
              id="input-description"
              // value={ descricao }
            />
          </label>
          <label htmlFor="input-currencies">
            Moeda
            <select
              type="number"
              name="descricao"
              id="input-currencies"
              // value={ descricao }
            >
              { currencies.map((moedas) => (
                <option
                  key={ moedas }
                  value={ moedas }
                >
                  {moedas}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="input-method">
            Forma de Pagamento:
            <select
              type="number"
              name="pagamento"
              data-testid="method-input"
              id="input-method"
              // value={ descricao }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="input-tag">
            Categoria da Despesa:
            <select
              type="number"
              name="pagamento"
              data-testid="tag-input"
              id="input-tag"
              // value={ descricao }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(actionFetchApi()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

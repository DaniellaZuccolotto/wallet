import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchApi, actionSaveForm } from '../actions/index';
import Despesa from '../components/Despesa';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onClick = () => {
    const { saveForm } = this.props;
    const { id } = this.state;
    this.setState({}, async () => {
      const recive = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await recive.json();
      this.setState({
        exchangeRates: data }, () => {
        saveForm(this.state);
        this.setState({ id: id + 1, value: '' });
      });
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value } = this.state;
    const getDespesas = expenses.reduce((acc, despesa) => {
      const { value: valor, currency, exchangeRates } = despesa;
      const moedas = Object.values(exchangeRates);
      const moedaFilter = moedas.filter((moeda) => moeda.code === currency);
      acc += valor * moedaFilter[0].ask;
      return acc;
    }, 0);
    return (
      <main>
        <header>
          <h2>TrybeWallet</h2>
          <p data-testid="email-field">{`Email:${email}`}</p>
          <p data-testid="total-field">{getDespesas.toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="input-value">
            Valor:
            <input
              onChange={ this.handleChange }
              type="number"
              name="value"
              data-testid="value-input"
              id="input-value"
              value={ value }
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              onChange={ this.handleChange }
              type="text"
              name="description"
              data-testid="description-input"
              id="input-description"
              // value={ description }
            />
          </label>
          <label htmlFor="input-currencies">
            Moedas
            <select
              onChange={ this.handleChange }
              name="currency"
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
              onChange={ this.handleChange }
              name="method"
              data-testid="method-input"
              id="input-method"
              // value={ descricao }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="input-tag">
            Categoria da Despesa:
            <select
              onChange={ this.handleChange }
              name="tag"
              data-testid="tag-input"
              id="input-tag"
              // value={ descricao }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.onClick }
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
        <div>
          <Despesa />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(actionFetchApi()),
  saveForm: (state) => dispatch(actionSaveForm(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getApi: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    currencies: PropTypes.number,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.number,
      code: PropTypes.string,
    }),
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

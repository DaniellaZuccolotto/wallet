import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchApi, actionSaveForm, actionEditExpense } from '../actions/index';
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
      btnEdit: false,
      idEdit: 0,
      exchangeRatesEdit: {},
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
    this.setState({}, async () => {
      const recive = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await recive.json();
      this.setState({
        exchangeRates: data }, () => {
        const { id, value, description, currency,
          method, tag, exchangeRates } = this.state;
        const newObjState = {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        };
        saveForm(newObjState);
        this.setState({ id: id + 1, value: '' });
      });
    });
  }

  onClickEdit = (idEd, exchangeRatesEdit) => {
    const { btnEdit } = this.state;
    if (!btnEdit) {
      this.setState({ btnEdit: true, idEdit: idEd, exchangeRatesEdit });
    } else {
      this.setState({ btnEdit: false, idEdit: idEd, exchangeRatesEdit });
    }
  }

  onClickEditForm = () => {
    const { expenses, editForm } = this.props;
    const { idEdit, value, description, currency,
      method, tag, exchangeRatesEdit } = this.state;
    // const filterExpenseExchange = expenses.filter((expense) => expense.id === idEdit);
    console.log(currency);
    const newObjState = {
      id: idEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRatesEdit,
    };
    const filterExpenseMap = expenses.map((expense) => {
      if (expense.id === idEdit) {
        return newObjState;
      } return expense;
    });
    editForm(filterExpenseMap);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, btnEdit } = this.state;
    const getDespesas = expenses.reduce((acc, despesa) => {
      const { value: valor, currency, exchangeRates } = despesa;
      const moedaFilter = exchangeRates[currency].ask;
      acc += Number(valor) * Number(moedaFilter);
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
              data-testid="currency-input"
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
          {
            btnEdit ? (
              <button
                type="button"
                onClick={ this.onClickEditForm }
              >
                Editar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.onClick }
              >
                Adicionar despesa
              </button>
            )
          }
        </form>
        <table>
          <tbody>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tbody>
        </table>
        <div>
          <Despesa onClickEdit={ this.onClickEdit } />
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
  editForm: (newArray) => dispatch(actionEditExpense(newArray)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getApi: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  editForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

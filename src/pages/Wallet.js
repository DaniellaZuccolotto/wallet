import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchApi, actionSaveForm, actionEditExpense } from '../actions/index';
import Despesa from '../components/Despesa';
import './Wallet.css';

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
        this.setState({ id: id + 1, value: '', description: '' });
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
    this.setState({ value: '', description: '', btnEdit: false });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, btnEdit, description } = this.state;
    const getDespesas = expenses.reduce((acc, despesa) => {
      const { value: valor, currency, exchangeRates } = despesa;
      const moedaFilter = exchangeRates[currency].ask;
      acc += Number(valor) * Number(moedaFilter);
      return acc;
    }, 0);
    return (
      <main className="content-wallet">
        <header className="content-header">
          <h2 className="content-title-wallet">TrybeWallet</h2>
          <div className="content-email">
            <p className="head-email" data-testid="email-field">{`Email:${email}`}</p>
            <p className="head" data-testid="total-field">{getDespesas.toFixed(2)}</p>
            <p className="head" data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form>
          <label htmlFor="input-value">
            Valor:
            <input
              className="form-control"
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
              className="form-control"
              onChange={ this.handleChange }
              type="text"
              name="description"
              data-testid="description-input"
              id="input-description"
              value={ description }
            />
          </label>
          <label htmlFor="input-currencies">
            Moedas
            <select
              className="form-control"
              onChange={ this.handleChange }
              data-testid="currency-input"
              name="currency"
              id="input-currencies"
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
              className="form-control"
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
              className="form-control"
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
                className="button-wallet"
                type="button"
                onClick={ this.onClickEditForm }
              >
                Editar despesa
              </button>
            ) : (
              <button
                className="button-wallet"
                type="button"
                onClick={ this.onClick }
              >
                Adicionar despesa
              </button>
            )
          }
        </form>
        <table className="table-wallet">
          <tbody className="tbody-wallet">
            <th className="description">Descrição</th>
            <th className="tag">Tag</th>
            <th className="method">Método de pagamento</th>
            <th className="value">Valor</th>
            <th className="coin">Moeda</th>
            <th className="cambio">Câmbio utilizado</th>
            <th className="value-conversion">Valor convertido</th>
            <th className="coin-conversion">Moeda de conversão</th>
            <th className="edit">Editar/Excluir</th>
          </tbody>
        </table>
        <div className="div-expense">
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

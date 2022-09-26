import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionRemoveExpense } from '../actions/index';
import './Despesa.css';

class Despesa extends React.Component {
  getAsk = (despesa) => {
    const { value, currency, exchangeRates } = despesa;
    // console.log(exchangeRates);
    const moedas = Object.values(exchangeRates);
    const moedaFilter = moedas.filter((moeda) => moeda.code === currency);
    const ask = Number(moedaFilter[0].ask);
    const valueTotal = (Number(value) * ask).toFixed(2);
    const valueTotalFixed = valueTotal;
    const moedaConversao = moedaFilter[0].name.split('/')[0];
    return {
      ask,
      valueTotalFixed,
      moedaConversao,
    };
  }

  onClick = (id) => {
    const { expenses, removeExpense } = this.props;
    const filterExpense = expenses.filter((expense) => expense.id !== id);
    removeExpense(filterExpense);
    // console.log(filterExpense);
  }

  render() {
    const { expenses, onClickEdit } = this.props;
    // console.log(expenses);
    return (
      <table className="table-expense">
        <tbody className="tbody-expense">
          {expenses.map((despesa, index) => (
            <tr key={ index } className="tr-expense">
              <td className="description-expense">{despesa.description}</td>
              <td className="tag-expense">{despesa.tag}</td>
              <td className="method-expense">{despesa.method}</td>
              <td className="value-expense">{Number(despesa.value).toFixed(2)}</td>
              <td className="coin-expense">{ this.getAsk(despesa).moedaConversao }</td>
              <td
                className="cambio-expense"
              >
                { (this.getAsk(despesa).ask).toFixed(2) }
              </td>
              <td
                className="value-conversion-expense"
              >
                { this.getAsk(despesa).valueTotalFixed }
              </td>
              <td className="coin-conversion-expense">Real</td>
              <td>
                <button
                  className="button-expense"
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => onClickEdit(despesa.id, despesa.exchangeRates) }
                >
                  Editar
                </button>
                <button
                  className="button-expense"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.onClick(despesa.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Despesa.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  removeExpense: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (filter) => dispatch(actionRemoveExpense(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesa);

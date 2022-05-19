import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Despesa extends React.Component {
  getAsk = (despesa) => {
    const { value, currency, exchangeRates } = despesa;
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

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        {expenses.map((despesa, index) => (
          <tr key={ index }>
            <td>{despesa.description}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.method}</td>
            <td>{Number(despesa.value).toFixed(2)}</td>
            <td>{ this.getAsk(despesa).moedaConversao }</td>
            <td>{ (this.getAsk(despesa).ask).toFixed(2) }</td>
            <td>{ this.getAsk(despesa).valueTotalFixed }</td>
            <td>Real</td>
            <td>{}</td>
          </tr>))}
      </table>
    );
  }
}

Despesa.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Despesa);

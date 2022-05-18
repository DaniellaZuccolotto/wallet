// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_API, ERROR } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return { ...state, currencies: action.resultAPI };
  case ERROR:
    return 'Deu erro na API';
  default:
    return state;
  }
};

export default walletReducer;

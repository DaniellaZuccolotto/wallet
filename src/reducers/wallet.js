// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_API, ERROR, SAVE_FORM,
  REMOVE_EXPENSE, EDIT_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return { ...state, currencies: action.resultAPI };
  case SAVE_FORM:
    return { ...state, expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: action.expensesEdit,
    };
  case ERROR:
    return {
      ...state,
      error: 'Deu erro na API',
    };
  default:
    return state;
  }
};

export default walletReducer;

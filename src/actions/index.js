// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const GET_API = 'GET_API';
export const ERROR = 'ERROR';
export const SAVE_FORM = 'SAVE_FORM';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
// export const GET_APICOMPLET = 'GET_APICOMPLET';

const getAPI = (resultAPI) => ({ type: GET_API, resultAPI });
// const getAPIComplet = (resultAPIComplet) => ({ type: GET_APICOMPLET, resultAPIComplet });
const getError = () => ({ type: ERROR });

export const actionSaveUser = (user) => ({
  type: SAVE_USER,
  user,
});

export const actionSaveForm = (expenses) => ({
  type: SAVE_FORM,
  expenses,
});

export const actionRemoveExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  expenses,
});

export const actionEditExpense = (expensesEdit) => ({
  type: EDIT_EXPENSE,
  expensesEdit,
});

export const actionFetchApi = () => async (dispatch) => {
  try {
    const recive = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await recive.json();
    const moedasResult = Object.keys(data);
    const filter = moedasResult.filter((moedas) => moedas !== 'USDT');
    dispatch(getAPI(filter));
  } catch (error) {
    dispatch(getError());
  }
};

export default { actionSaveUser,
  SAVE_USER,
  GET_API,
  ERROR,
  actionFetchApi,
  actionSaveForm };

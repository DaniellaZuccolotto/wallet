// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const GET_API = 'GET_API';
export const ERROR = 'ERROR';

const getAPI = (resultAPI) => ({ type: GET_API, resultAPI });

const getError = () => ({ type: ERROR });

export const actionSaveUser = (user) => (
  {
    type: SAVE_USER,
    user,
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

export default { actionSaveUser, SAVE_USER, GET_API, ERROR, actionFetchApi };

// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return { ...state, email: action.user };
  default:
    return state;
  }
};

export default userReducer;

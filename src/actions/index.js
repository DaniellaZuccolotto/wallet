// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';

export const actionSaveUser = (user) => (
  {
    type: SAVE_USER,
    user,
  });

export default { actionSaveUser, SAVE_USER };

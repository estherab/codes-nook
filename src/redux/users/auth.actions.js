/* const fakeUsers = [
  {email: 'alumno@upgrade.com', password: '1234asdf', nick: 'Paco', role: 'user' },
  {email: 'profesor@upgrade.com', password: '1234asdf', nick: 'Antonio', lastName: 'admin' },
]; */

export const SAVE_USER = "SAVE_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";

/* export const checkUser = (form) => {
  return fakeUsers.find((user) => {
    return form.email === user.email && form.password === user.password;
  });
}; */

export const saveUser = (res, redirect) => dispatch => {

  localStorage.setItem("token", res.data.token);
  const existsUser = {
    userName: res.data.userDB.userName,
    email: res.data.userDB.email,
    password: res.data.userDB.password,
    rol: res.data.userDB.rol
  }
  console.log('login user', existsUser);

  const action = {
    type: SAVE_USER,
    payload: existsUser,
  }

  dispatch(action);
  if (existsUser) redirect();
};

export const logoutUser = (res) => dispatch => {
  localStorage.setItem("token", res.data);
  console.log('logout user');
  
  const action = {
    type: LOGOUT_USER
  }

  dispatch(action);
};

export const loginError = (error) => dispatch => {
  console.log('login error', error);
  const action = {
    type: LOGIN_ERROR,
    payload: error,
  }

  dispatch(action);
};  
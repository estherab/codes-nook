import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
};
export const API = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: APIHeaders,
});

/*
//Loggearse con un usuario (nos devuelve el token)
API.post('users/login', {"email": "admin@admin.com", "password": "Admin123*"}).then((res) => {
  localStorage.setItem("token", res.data.token);
  console.log('login', res.data);
})

//Añadir un nuevo usuario a la base de datos. No se necesita token.
API.post('users', {"userName": "javiercito", "email": "javier@javier.com", "password": "123"})

//Nos devuelve todos los usuarios de nuestra base de datos. Se necesita token.
API.get('users').then((res) => {
  console.log('users', res.data);
})

//Devuelve el token a null
API.post('users/logout').then((res) => {
  localStorage.setItem("token", res.data);
})
*/

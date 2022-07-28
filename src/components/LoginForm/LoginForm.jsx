import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../redux/users/auth.actions";
import { loginError } from "../../redux/users/auth.actions";
import { API } from "../../hooks/Api";
import "./LoginForm.scss";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(INITIAL_STATE);

  const submitForm = (ev) => {
    ev.preventDefault();

    API.post("users/login", state)
      .then((res) => {
        const redirect = () => navigate("/");
        dispatch(saveUser(res, redirect));
      })
      .catch((error) => {
        dispatch(loginError(error.response.data));
      });

  };

  return (
    <>
      <div className='login__container'>
        <h2>Login now, you must</h2>

        <form onSubmit={submitForm}>

          <label>Email</label>
          <input type='email' placeholder='Input your email address' value={state.email} name="email" onChange={(ev) => setState({...state, [ev.target.name]: ev.target.value})}/>

          <label>Password</label>
          <input type='password' placeholder='Input your password' value={state.password} name="password" onChange={(ev) => setState({...state, [ev.target.name]: ev.target.value})}/>

          <button className='button__primary' type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;

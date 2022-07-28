import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../redux/users/auth.actions";
import { loginError } from "../../redux/users/auth.actions";
import { API } from "../../hooks/Api";
import "./RegisterForm.scss";

const INITIAL_STATE = {
  userName: "",
  email: "",
  password: "",
};

const RegisterForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(INITIAL_STATE);


  const submitForm = (ev) => {
    ev.preventDefault();

    API.post("users", state);

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
      <div className='register__container'>
        <h2>Welcome to the family</h2>

        <form onSubmit={submitForm}>
          <label>Username</label>
          <input
            type='text'
            placeholder='Input your nickname'
            value={state.userName}
            name='userName'
            onChange={(ev) =>
              setState({ ...state, [ev.target.name]: ev.target.value })
            }
          />

          <label>Email</label>
          <input
            type='email'
            placeholder='Input your email address'
            value={state.email}
            name='email'
            onChange={(ev) =>
              setState({ ...state, [ev.target.name]: ev.target.value })
            }
          />

          <label>Password</label>
          <input
            type='password'
            placeholder='Input your new password'
            value={state.password}
            name='password'
            onChange={(ev) =>
              setState({ ...state, [ev.target.name]: ev.target.value })
            }
          />

          <button className='button__primary' type='submit'>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;

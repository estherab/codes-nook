import "./Auth.scss";
import { LoginForm, RegisterForm } from "./../../components";

const Auth = () => {
  return (
    <>
      <div className="forms__container">
        <LoginForm />
        <RegisterForm />
      </div>
    </>
  );
};

export default Auth;

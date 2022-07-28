import logo from "./../../logo.svg";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/users/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { API } from "../../hooks/Api";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    API.post('users/logout').then((res) => {
      dispatch(logoutUser(res));
    })
  }

  return (
    <>
      <nav>
        <ul>
          <img src={logo} alt='logo' />

          <div className='items__center'>
            <li>
              <Link to='/htmlcss'>HTML / CSS</Link>
            </li>

            <li>
              <Link to='/javascript'>Javascript</Link>
            </li>

            <li>
              <Link to='/angular'>Angular</Link>
            </li>

            <li>
              <Link to='/react'>React</Link>
            </li>
          </div>

          <div className='items__right'>
            { !user &&
              <Link to='/auth'>
                <button>Login</button>
              </Link>
            }
            { user &&
            <>
              <li>
                <Link to='/manager'>Manager</Link>
              </li>
              <button onClick={logout}>Logout</button>
            </>
            }

          </div>
        </ul>
      </nav>
    </>
  );
};

export default Header;

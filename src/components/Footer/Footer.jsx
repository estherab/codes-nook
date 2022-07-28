import "./Footer.scss";
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <NavLink to="/">
                <img className="footer__logo" width="300px" src="/assets/codes_nook_logo.svg" alt="logotipo codes' nook" />
            </NavLink>
            <p className="footer__copyright">Copyright 2022 - Codes' Nook</p>
        </footer>
    )
}

export default Footer;
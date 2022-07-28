import React from "react";
import "./Nav-select.scss";
import { NavLink } from "react-router-dom";
import LogoIcon from "./LogoIcon";

function NavSelect({ language, linkResources, linkChallenges }) {
  return (
    <div className='nav-select'>
      <h2 className='nav-select__title'>¿What do you prefer today?</h2>
      <div className='nav-select__links'>
        <NavLink
          to={linkResources}
          className={({ isActive }) =>
            isActive
              ? "nav-select__link nav-select__link--active"
              : "nav-select__link"
          }
        >
          <LogoIcon className='nav-select__icon' />
          <p className='nav-select__text'>RESOURCES</p>
        </NavLink>
        <NavLink
          to={linkChallenges}
          className={({ isActive }) =>
            isActive
              ? "nav-select__link nav-select__link--active"
              : "nav-select__link"
          }
        >
          <LogoIcon className='nav-select__icon' />
          <p className='nav-select__text'>CHALLENGES</p>
        </NavLink>
      </div>
    </div>
  );
}

export default NavSelect;

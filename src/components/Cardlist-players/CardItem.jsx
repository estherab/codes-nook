import React, { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import { Link } from "react-router-dom";

const CardItem = ({ data, recibirDeHeaderParent }) => {
  // const { title } = post;
  const [isHover, setIsHover] = useState(false);

  const getEmail = (ev) => {
    ev.preventDefault();
  };

  return (
    <li
      className={`${isHover ? "card-list__card is-hover" : "card-list__card"}`}
    >
      <div className='card-list__content'>
        <h4 className='card-list__title'>{data.user}</h4>
        <div className='card-list__links'>
          <a href={data.link} className='card-list__link' id='link'>
            Link to web
            <ArrowIcon className='card-list__icon' />
          </a>
          <a href={data.repository} className='card-list__link' id='repository'>
            Repository
            <ArrowIcon className='card-list__icon' />
          </a>
        </div>
      </div>
      <button
        onClick={() => recibirDeHeaderParent(data.user)}
        className='card-list__action'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        Rate
      </button>
    </li>
  );
};

export default CardItem;

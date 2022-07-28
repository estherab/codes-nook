import React, { useState, useEffect } from "react";

import "./Cardlist-players.scss";

import { data } from "../../data/data";
import CardItem from "./CardItem";

function CardlistPlayers({ post, recibirDeHeaderParent }) {
  const [challangesData, setChallangesData] = useState(null);

  const recibirDeHeaderHandle = (valor) => {
    recibirDeHeaderParent(valor);
  };

  useEffect(() => {
    // api call here
    setChallangesData(post.solutions);
  }, [post]);

  return (
    <section className='card-list'>
      <h3 className='card-list__heading'>Projects</h3>

      <ul className='card-list__list'>
        {challangesData &&
          challangesData.map((challange, index) => (
            <CardItem
              data={challange}
              key={index}
              recibirDeHeaderParent={recibirDeHeaderHandle}
            />
          ))}
      </ul>
    </section>
  );
}

export default CardlistPlayers;

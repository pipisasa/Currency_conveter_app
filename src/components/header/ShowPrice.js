import React from "react";
import "./ShowPrice.css";

function ShowPrice({ exchange, imgurl, rate }) {
  return (
    <div className="showprice">
      <img className="showprice__img" alt="img" src={imgurl} />
      <div className="showprice__info">
        <div className="showprice__currency">{exchange}</div>
        <div className="showprice__price">{rate.rate}</div>
      </div>
    </div>
  );
}

export default ShowPrice;

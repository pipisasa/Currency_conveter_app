import React from "react";
import "./ShowPrice.css";
import numeral from "numeral";

// добавил props value
function ShowPrice({ exchange, imgurl, value = 0 }) {
  return (
    <div className="showprice">
      <div className="showprice__rate"></div>
      <img className="showprice__img" alt="" src={imgurl} />
      <div className="showprice__info"></div>
      {/* Поменял местами div-ы */}
      {/* передал value */}
      <div className="showprice__price">
        {numeral(value).format("0,0.[00]")}
      </div>
      <div className="showprice__currency">{exchange}</div>
    </div>
  );
}

export default ShowPrice;

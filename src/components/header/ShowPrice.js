import React from "react";
import "./ShowPrice.css";
import numeral from "numeral";

function ShowPrice({ exchange, imgurl }) {
  return (
    <div className="showprice">
      <div className="showprice__rate"></div>
      <img className="showprice__img" alt="" src={imgurl} />
      <div className="showprice__info"></div>
      <div className="showprice__currency">{exchange}</div>
      <div className="showprice__price">
        {numeral(1000.111).format("0,0.[00]")}
      </div>
    </div>
  );
}

export default ShowPrice;

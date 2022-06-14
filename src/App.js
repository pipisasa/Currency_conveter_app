import "./index.css";
import CurrencyInput from "./components/currency/CurrencyInput";
import { useState, useEffect } from "react";
import ShowPrice from "./components/header/ShowPrice";
import { dateTime } from "./utils";
import { url, USD_UAH, EUR_UAH } from "./constants";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [results, setResults] = useState([]);
  const [rateUsd, setUsdRate] = useState([]);
  const [rateEur, setEurRate] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResults(data.results);
        console.log(data.results);
      });
  }, []);

  useEffect(() => {
    fetch(USD_UAH)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.result.rate);
        setUsdRate(data.result);
      });
  }, []);

  useEffect(() => {
    fetch(EUR_UAH)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEurRate(data.result);
        console.log(data.result);
      });
  }, []);

  useEffect(() => {
    if (!!results) handleAmount1Change(1);
  }, [results]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * results[currency2]) / results[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * results[currency2]) / results[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * results[currency1]) / results[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * results[currency1]) / results[currency2]));
    setCurrency2(currency2);
  }

  return (
    <>
      <div className="app">
        <div className="app__rates">
          <h1>Exchange rates</h1>
          <h4>As of: {dateTime}</h4>
        </div>

        <ShowPrice
          rate={rateUsd}
          exchange="USD/UAH"
          imgurl="https://pngimg.com/uploads/dollar_sign/small/dollar_sign_PNG3.png"
        />
        <ShowPrice
          rate={rateEur}
          exchange="EUR/UAH"
          imgurl="https://pngimg.com/uploads/euro_sign/small/euro_sign_PNG3.png"
        />
      </div>
      <div className="converter">
        <h1>Currency converter</h1>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(results)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(results)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </>
  );
}

export default App;

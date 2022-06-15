import "./index.css";
import CurrencyInput from "./components/currency/CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowPrice from "./components/header/ShowPrice";
import { dateTime } from "./utils";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [usdToUah, setUsdToUah] = useState(1);
  const [eurToUah, setEurToUah] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get("https://cdn.cur.su/api/latest.json").then((response) => {
      const _rates = response.data.rates;
      setRates(_rates);
      console.log({ _rates })
      // Получаем курс доллара к гривну
      const _usdToUah = _rates['UAH'];
      // Получаем курс доллара к евро
      const _usdToEur = _rates['EUR'];
      // Высчитваем курс евро к гривну;
      const _eurToUah = _usdToUah / _usdToEur;
      // сохраняем значения;
      setUsdToUah(_usdToUah);
      setEurToUah(_eurToUah);
    });
  }, []);

  useEffect(() => {
    if (!!rates) handleAmount1Change(1);
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
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
          exchange="USD/UAH"
          imgurl="https://pngimg.com/uploads/dollar_sign/small/dollar_sign_PNG3.png"
          // Передали значение
          value={usdToUah}
        />
        <ShowPrice
          exchange="EUR/UAH"
          imgurl="https://pngimg.com/uploads/euro_sign/small/euro_sign_PNG3.png"
          // Передали значение
          value={eurToUah}
        />
      </div>
      <div className="converter">
        <h1>Currency converter</h1>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </>
  );
}

export default App;

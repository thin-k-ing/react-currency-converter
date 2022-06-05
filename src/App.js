import { useEffect, useState } from "react";

import "./App.css";
import CurrencyRow from "./CurrencyRow.js";

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";
const API_KEY = "ywGNB68s2mDfvIn9fbLpMWEGo9EvnaoA";

var myHeaders = new Headers();
myHeaders.append("apikey", API_KEY);

var requestOptions = {
	method: "GET",
	redirect: "follow",
	headers: myHeaders,
};

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [exchangeRate, setExchangeRate] = useState();

	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	console.log(exchangeRate);

	let toAmount, fromAmount;

	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	useEffect(() => {
		fetch(BASE_URL, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setCurrencyOptions([...Object.keys(result.rates)]);
				setFromCurrency(result.base);
				setToCurrency([...Object.keys(result.rates)][0]);

				console.log(result);
			})
			.catch((error) => console.log("error", error));
	}, []);

	useEffect(() => {
		if (fromCurrency != null && toCurrency != null) {
			fetch(
				`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`,
				requestOptions
			)
				.then((res) => res.json())
				.then((data) => setExchangeRate(data.rates[toCurrency]));
		}
	}, [fromCurrency, toCurrency]);

	function handleFromAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	}

	return (
		<>
			<h1>Convert</h1>
			<CurrencyRow
				options={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				amount={fromAmount}
				onChangeAmount={handleFromAmountChange}
			/>
			<div className="equals">=</div>
			<CurrencyRow
				options={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				amount={toAmount}
				onChangeAmount={handleToAmountChange}
			/>
		</>
	);
}

export default App;

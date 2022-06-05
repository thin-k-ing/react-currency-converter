import React from "react";

export default function CurrencyRow({
	options,
	selectedCurrency,
	onChangeCurrency,
	amount,
	onChangeAmount,
}) {
	return (
		<div>
			<input
				type="number"
				className="input"
				value={amount}
				onChange={onChangeAmount}
			/>
			<select value={selectedCurrency} onChange={onChangeCurrency}>
				{options.map((option) => (
					<option value={option} key={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

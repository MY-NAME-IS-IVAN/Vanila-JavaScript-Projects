const currencyListElement1 = document.getElementById('currency-list-1');
const currencyListElement2 = document.getElementById('currency-list-2');

const currencyAmountElement1 = document.getElementById('currency-amount-1');
const currencyAmountElement2 = document.getElementById('currency-amount-2');

const rateElement = document.getElementById('rate');
const swapButton = document.getElementById('swap-button');

function calculate() {
  const currency1 = currencyListElement1.value;
  const currency2 = currencyListElement2.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API}/latest/${currency1}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency2];
      rateElement.innerText = `1 ${currency1} = ${rate} ${currency2}`

      currencyAmountElement2.value = (currencyAmountElement1.value * rate).toFixed(2);
    });
}


calculate();

currencyListElement1.addEventListener('change', calculate);
currencyListElement2.addEventListener('change', calculate);
currencyAmountElement1.addEventListener('input', calculate);
currencyAmountElement2.addEventListener('input', calculate);

swapButton.addEventListener('click', () => {
  [currencyListElement1.value, currencyListElement2.value] = [currencyListElement2.value, currencyListElement1.value];
  calculate();
})
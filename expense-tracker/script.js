const balanceNumberElement = document.getElementById('balance-number');

const incomeList = document.getElementById('income-list');
const expensesList = document.getElementById('expenses-list');

const transactionForm = document.getElementById('transaction-form');

const transactionDescriptionInput = document.getElementById(
  'transaction-description'
);
const transactionAmountInput = document.getElementById('transaction-amount');

let allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(id, description, amount) {
  const isIncome = amount > 0;

  const transactionItem = document.createElement('li');
  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.classList.add('delete-transaction');

  const transactionName = document.createElement('p');
  transactionName.innerText = description;

  const transactionAmount = document.createElement('span');
  transactionAmount.classList.add(isIncome ? 'income' : 'expense');

  if (isIncome) {
    transactionAmount.innerText = `+$${amount}`;
  } else {
    transactionAmount.innerText = `-$${Math.abs(amount)}`;
  }

  transactionItem.appendChild(deleteButtonElement);
  transactionItem.appendChild(transactionName);
  transactionItem.appendChild(transactionAmount);

  deleteButtonElement.addEventListener('click', () => {
    allTransactions = allTransactions.filter((item) => item.id !== id);
    saveTransactions();
    transactionItem.remove();
  });

  if (isIncome) {
    incomeList.appendChild(transactionItem);
  } else {
    expensesList.appendChild(transactionItem);
  }
}

function addNewTransaction() {
  const description = transactionDescriptionInput.value.trim();
  const amount = transactionAmountInput.value;
  const currentID = Date.now();

  if (description === '') {
    alert('Transaction name is empty');
    return;
  }

  if (amount === '0' || amount === '') {
    alert('Transaction amount is empty or 0');
    return;
  }

  console.log(typeof transactionAmountInput.value)

  allTransactions.push({ id: currentID, name: description, amount: amount });
  addTransaction(currentID, description, amount);
  saveTransactions();

  transactionDescriptionInput.value = '';
  transactionAmountInput.value = null;
}

function loadSavedTransactions() {
  allTransactions.forEach((item) => {
    addTransaction(item.id, item.name, item.amount);
  });
}

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(allTransactions));
  updateBalance();
}

function updateBalance() {
  let balance = allTransactions.reduce(
    (accumulator, item) => accumulator + parseInt(item.amount),
    0
  );

  if (balance >= 0) {
    balanceNumberElement.classList.add('positive');
    balanceNumberElement.classList.remove('negative');

    balanceNumberElement.innerHTML = `$${balance}`;
  } else {
    balanceNumberElement.classList.add('negative');
    balanceNumberElement.classList.remove('positive');

    balanceNumberElement.innerHTML = `-$${Math.abs(balance)}`;
  }
}

transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewTransaction();
});

loadSavedTransactions();
updateBalance();
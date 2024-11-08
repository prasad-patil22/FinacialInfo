// Get elements from the DOM
const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

let transactions = [];

// Add a new transaction
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (!description || isNaN(amount)) return;

    const transaction = { description, amount, category };
    transactions.push(transaction);
    updateUI();
    form.reset();
});

// Update the UI
function updateUI() {
    transactionList.innerHTML = '';
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description} - <span>₹${transaction.amount.toFixed(2)}</span>`;

        if (transaction.category === 'income') {
            li.classList.add('income');
            totalIncome += transaction.amount;
        } else {
            li.classList.add('expense');
            totalExpenses += transaction.amount;
        }

        transactionList.appendChild(li);
    });

    // Update totals in Rupees
    totalIncomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `₹${totalExpenses.toFixed(2)}`;
    balanceEl.textContent = `₹${(totalIncome - totalExpenses).toFixed(2)}`;
}

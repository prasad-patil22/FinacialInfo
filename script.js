const form = document.getElementById('transaction-form');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add a new transaction
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        const transaction = { id: Date.now(), description, amount, category };
        transactions.push(transaction);
        saveTransactions();
        updateUI();
        form.reset();
    });
}

// Update the main page UI
function updateUI() {
    const totalIncome = transactions
        .filter((t) => t.category === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter((t) => t.category !== 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    if (totalIncomeEl) totalIncomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
    if (totalExpensesEl) totalExpensesEl.textContent = `₹${totalExpenses.toFixed(2)}`;
    if (balanceEl) balanceEl.textContent = `₹${(totalIncome - totalExpenses).toFixed(2)}`;
}

// Navigate to another page
function navigateTo(page) {
    saveTransactions();
    window.location.href = page;
}

// Initialize the page
updateUI();

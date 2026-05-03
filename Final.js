let monthlyBudget = parseFloat(localStorage.getItem('monthlyBudget')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budgetChart;

const PARENT_EMAIL = "iamsanketspatil@gmail.com"; 

window.onload = () => {
    document.getElementById('display-budget').innerText = `₹${monthlyBudget.toFixed(2)}`;
    renderAllExpenses();
    refreshDisplay();
    updateChart(); 
};

function setMonthlyBudget() {
    const budgetInput = document.getElementById('monthly-limit');
    const val = parseFloat(budgetInput.value);
    if (val > 0) {
        monthlyBudget = val;
        localStorage.setItem('monthlyBudget', monthlyBudget);
        document.getElementById('display-budget').innerText = `₹${monthlyBudget.toFixed(2)}`;
        refreshDisplay();
        budgetInput.value = '';
    }
}

function addExpense() {
    const amountField = document.getElementById('expense-amount');
    const categoryField = document.getElementById('expense-category');
    const amount = parseFloat(amountField.value);
    const category = categoryField.value;

    if (amount > 0) {
        if (amount > 1000) {
            triggerParentAlert(amount, category);
        }

        const newExpense = {
            id: Date.now(),
            amount: amount,
            category: category,
            date: new Date().toLocaleDateString('en-IN')
        };

        expenses.push(newExpense);
        saveAndRender();
        amountField.value = '';
    }
}

function triggerParentAlert(amt, cat) {
    const params = {
        parent_id: PARENT_EMAIL,
        amt: amt.toFixed(2),
        category: cat,
        date: new Date().toLocaleDateString('en-IN')
    };

    emailjs.send("service_parent", "template_Sanket", params)
        .then(() => alert("High-value transaction! Parent notified."))
        .catch(err => console.error("Email failed:", err));
}

function saveAndRender() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderAllExpenses();
    refreshDisplay();
    updateChart(); 
}


function renderAllExpenses() {
    const cats = ['Food', 'Stationery', 'Transport', 'Entertainment', 'MoneyLent', 'Other'];
    cats.forEach(c => document.getElementById(`list-${c.replace(/\s/g, '')}`).innerHTML = '');

    expenses.forEach(item => {
        const list = document.getElementById(`list-${item.category.replace(/\s+/g, '')}`);
        if (list) {
            const li = document.createElement('li');
            li.innerHTML = `<span>₹${item.amount.toFixed(2)}</span><span class="date-stamp">${item.date}</span>`;
            list.appendChild(li);
        }
    });
}

function refreshDisplay() {
    const totalSpent = expenses.reduce((sum, i) => sum + i.amount, 0);
    const remaining = monthlyBudget - totalSpent;
    const remText = document.getElementById('remaining-budget');
    
    document.getElementById('total-spent').innerText = `₹${totalSpent.toFixed(2)}`;
    remText.innerText = `₹${remaining.toFixed(2)}`;
    
    if (monthlyBudget > 0 && totalSpent > monthlyBudget) {
        alert("Warning: Monthly budget exceeded!");
    }
    remText.style.color = remaining < 0 ? "#ff7e5f" : "#764ba2";
}

function resetAllData() {
    if (confirm("Reset everything?")) {
        localStorage.clear();
        location.reload();
    }
}

function updateChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    
    
    const categories = ['Food', 'Stationery', 'Transport', 'Entertainment', 'MoneyLent', 'Other'];
    const dataValues = categories.map(cat => {
        return expenses
            .filter(item => item.category === cat)
            .reduce((sum, item) => sum + item.amount, 0);
    });

    if (budgetChart) {
        budgetChart.destroy();
    }

    budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                label: 'Spending by Category',
                data: dataValues,
                backgroundColor: [
                    '#667eea', '#764ba2', '#ff7e5f', '#feb47b', '#48bb78', '#a0aec0'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
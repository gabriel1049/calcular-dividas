document.getElementById("addButton").addEventListener("click", addDebt);
document.getElementById("clearButton").addEventListener("click", clearDebts);

let total = 0;
let debts = [];

function addDebt() {
    const name = document.getElementById("debtName").value;
    const value = parseFloat(document.getElementById("debtValue").value);
    
    if (name && value) {
        debts.push({ name, value });
        updateDebts();
        updateTotal(value);
        saveDebts();
    }
}

function updateDebts() {
    const container = document.getElementById("debtsContainer");
    container.innerHTML = '';
    debts.forEach(debt => {
        const debtCard = document.createElement("div");
        debtCard.classList.add("debt-card");
        debtCard.innerHTML = `<h3>${debt.name}</h3><p class="value">R$ ${debt.value.toFixed(2)}</p>`;
        container.appendChild(debtCard);
    });
}

function updateTotal(value) {
    total += value;
    document.getElementById("total").innerText = `Total: R$ ${total.toFixed(2)}`;
}

function saveDebts() {
    localStorage.setItem('debts', JSON.stringify(debts));
}

function loadDebts() {
    const savedDebts = JSON.parse(localStorage.getItem('debts'));
    if (savedDebts) {
        savedDebts.forEach(debt => {
            debts.push(debt);
            updateDebts();
            updateTotal(debt.value);
        });
    }
}

function clearDebts() {
    total = 0;
    debts = [];
    updateDebts();
    updateTotal(0);
    localStorage.removeItem('debts');
}

window.onload = loadDebts;

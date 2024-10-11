// scripts.js
const baseUrl = "https://parseapi.back4app.com/Despesas"
const headers = {
    "X-Parse-Application-Id": "hb6Y306wmPOojZd4ap8lGw6UjCdoGI0j30Rq0Z6Y" ,
    "X-Parse-REST-API-KEY": "bI8Tad5TvISseJvLyvZevm7O6Qy6OXt8DCeYOu8H" ,
}
async function createExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (description && amount) {
        const Expense = Parse.Object.extend("Expense");
        const expense = new Expense();
        expense.set("description", description);
        expense.set("amount", amount);
        try {
            await expense.save();
            alert("Despesa cadastrada com sucesso!");
            loadExpenses(); // Recarregar a lista de despesas
        } catch (error) {
            alert('Erro ao cadastrar despesa: ' + error.message);
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

async function loadExpenses() {
    const Expense = Parse.Object.extend("Expense");
    const query = new Parse.Query(Expense);
    try {
        const results = await query.find();
        const expenseTableBody = document.getElementById("expenseTableBody");
        expenseTableBody.innerHTML = ""; // Limpar a tabela
        let totalAmount = 0;
        results.forEach(expense => {
            const id = expense.id;
            const description = expense.get("description");
            const amount = expense.get("amount");
            totalAmount += amount;
            expenseTableBody.innerHTML += `
                <tr>
                    <td>${description}</td>
                    <td><input type="number" value="${amount}" id="amount-${id}"></td>
                    <td>
                        <button onclick="updateExpense('${id}')">Atualizar</button>
                        <button onclick="deleteExpense('${id}')">Deletar</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
    } catch (error) {
        alert('Erro ao carregar despesas: ' + error.message);
    }
}

async function updateExpense(id) {
    const Expense = Parse.Object.extend("Expense");
    const query = new Parse.Query(Expense);
    try {
        const expense = await query.get(id);
        const newAmount = parseFloat(document.getElementById(`amount-${id}`).value);
        if (newAmount && newAmount >= 0) {
            expense.set("amount", newAmount);
            await expense.save();
            alert("Despesa atualizada com sucesso!");
            loadExpenses(); // Recarregar a lista de despesas
        } else {
            alert("Por favor, insira um valor válido.");
        }
    } catch (error) {
        alert('Erro ao atualizar despesa: ' + error.message);
    }
}

async function deleteExpense(id) {
    const Expense = Parse.Object.extend("Expense");
    const query = new Parse.Query(Expense);
    try {
        const expense = await query.get(id);
        await expense.destroy();
        alert("Despesa deletada com sucesso!");
        loadExpenses(); // Recarregar a lista de despesas
    } catch (error) {
        alert('Erro ao deletar despesa: ' + error.message);
    }
}

// Carregar as despesas ao carregar a página
loadExpenses();
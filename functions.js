//create array from localStorage to store expense objects
const getExpenses = () => {
    const expensesJSON = localStorage.getItem('expenses')
    if (expensesJSON !== null) {
        return JSON.parse(expensesJSON)
    } else {
        return []
    }
}

//create DOM elements for expenses
const generateExpenseDOM = () => {
    expenseList.textContent = ''
    expenses.forEach(function (expense, index) {
        const expenseItem = document.createElement('li')
        expenseItem.textContent = expense.description
        expenseList.appendChild(expenseItem)
    })
}

// Update expenses 
const updateExpenses = () => {
    const newExpense = {
        description: expenseInput.value,
        cost: expenseCostInput.value
    }
    expenses.push(newExpense)

    //clear inputs
    expenseInput.value = ''
    expenseCostInput.value = ''

    //update localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses))
}
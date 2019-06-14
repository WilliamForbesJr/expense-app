const expenseInput = document.querySelector('#expense-input')
const expenseCostInput = document.querySelector("#expense-cost-input")
const expenseList = document.querySelector("#expense-list")

//create array to store expense objects

const getExpenses = () => {
    const expensesJSON = localStorage.getItem('expenses')
    if (expensesJSON !== null) {
        return JSON.parse(expensesJSON)
    } else {
        return []
    }
}
const expenses = getExpenses()



//listen for submit
document.querySelector('#expense-submit').addEventListener('click', () => {
    updateExpenses()
    generateExpenseDOM()
})


//create DOM elements for expenses
const generateExpenseDOM = () => {
    expenseList.textContent = ''
    expenses.forEach(function(expense, index){
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
generateExpenseDOM()

//need to refactor submit button to create new expense object with expense and cost properties (constructor function?)


//refactor goals:
    //consolidate code into functions
    // modularize functions after wiring everything up
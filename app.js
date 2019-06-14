const expenseInput = document.querySelector('#expense-input')
const expenseCostInput = document.querySelector("#expense-cost-input")
const expenseList = document.querySelector("#expense-list")


const expenses = getExpenses()

//listen for submit
document.querySelector('#expense-submit').addEventListener('click', () => {
    updateExpenses()
    generateExpenseDOM()
})



generateExpenseDOM()

//need to refactor submit button to create new expense object with expense and cost properties (constructor function?)


//refactor goals:
    //consolidate code into functions
    // modularize functions after wiring everything up
const expenseInput = document.querySelector('#expense-input')
const expenseCostInput = document.querySelector("#expense-cost-input")
const expenseList = document.querySelector("#expense-list")

const expenses = getExpenses()

//load DOM elements
generateExpenseDOM()
console.log(calculateTotalExpenses())


//listen for submit
document.querySelector('#expense-submit').addEventListener('click', () => {
    updateExpenses()
    generateExpenseDOM()
})



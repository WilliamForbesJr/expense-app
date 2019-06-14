const expenseInput = document.querySelector('#expense-input')
const expenseCostInput = document.querySelector("#expense-cost-input")
const expenseList = document.querySelector("#expense-list")

const incomeDescription = document.querySelector('#income-input')
const incomeAmountInput = document.querySelector('#income-amount-input')
const incomeList = document.querySelector("#income-list")

const expenses = getExpenses()
const income = getIncome()

//load DOM elements
generateExpenseDOM()
generateIncomeDOM()


//Income Submit Event Listener
document.querySelector('#income-submit').addEventListener('click', () => {
    updateIncome()
    generateIncomeDOM()
})

//Expense Submit Event Listener
document.querySelector('#expense-submit').addEventListener('click', () => {
    updateExpenses()
    generateExpenseDOM()
})




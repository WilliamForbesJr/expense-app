const expenseInput = document.querySelector('#expense-input')
const expenseCostInput = document.querySelector("#expense-cost-input")
const expenseList = document.querySelector("#expense-list")

const incomeDescription = document.querySelector('#income-input')
const incomeAmountInput = document.querySelector('#income-amount-input')
const incomeList = document.querySelector("#income-list")

const data = getData()
generateDOM()


//Income Submit Event Listener
document.querySelector('#income-submit').addEventListener('click', () => {
    updateData('income', incomeDescription.value, incomeAmountInput.value)
    generateDOM()
})

//Expense Submit Event Listener
document.querySelector('#expense-submit').addEventListener('click', () => {
    updateData('expense', expenseInput.value, expenseCostInput.value)
    generateDOM()
})




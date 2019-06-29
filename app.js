const expenseInput = document.querySelector('#expense-input')
const expenseAmountInput = document.querySelector("#expense-cost-input")
const expenseList = document.querySelector("#expense-list")
const expenseOptions = document.querySelector('#expense-category-list')
const expenseCategoryInput = document.querySelector('#expense-category-input')
const addExpenseContainer = document.querySelector('.add-expense-container')

const incomeInput = document.querySelector('#income-input')
const incomeAmountInput = document.querySelector('#income-amount-input')
const incomeList = document.querySelector("#income-list")

const data = getData()
const categoryArray = []

generateDOM()

//Income Submit Event Listener
document.querySelector('#income-submit').addEventListener('click', () => {
    updateData('income', incomeInput.value, parseInt(incomeAmountInput.value))
    generateDOM()
})

//Expense Submit Event Listener
document.querySelector('#expense-submit').addEventListener('click', (e) => {
    updateData('expense', expenseInput.value, parseInt(expenseAmountInput.value), expenseCategoryInput.value.toLowerCase())
    generateDOM()
    toggleElementVisability(addExpenseContainer)
})

document.querySelectorAll('.category-button').forEach((categoryButton) => {
    categoryButton.addEventListener('click', (e) => {
        // Check if addExpenseContainer is visible and toggle, if not
        if (expenseCategoryInput.value === '' && addExpenseContainer.classList.contains('hide')) {
            toggleElementVisability(addExpenseContainer, addExpenseContainer)
        }
        //autocomplete expense category field with selected category
        expenseCategoryInput.value = categoryButton.parentNode.querySelector('h5').textContent.toLowerCase()
        console.log(e.target)
        e.stopPropagation()

        // close open category lists when adding new expense
        document.querySelectorAll('.expense-items').forEach((item) => {
            if (!item.classList.contains('hide')) {
                toggleElementVisability(item)
            }
        })
        expenseInput.focus()
        expenseInput.scrollIntoView({ behavior: "smooth", block: "center" })
    })
})

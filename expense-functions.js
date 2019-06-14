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
        expenseItem.setAttribute('class', 'list-group-item')

        // Create Button to Remove Expense
        const removeExpense = document.createElement('button')
        removeExpense.setAttribute('class', 'delete-expense btn btn-danger btn-sm')
        removeExpense.textContent = 'X'

        //delete logic for button
        removeExpense.addEventListener('click', () => {
            expenses.splice(index, index+1)
            updateLocalStorage()
            generateExpenseDOM()
        })
        
        expenseItem.textContent = `Item:  ${expense.description} Cost:  ${expense.cost}`
        expenseItem.appendChild(removeExpense)
        expenseList.appendChild(expenseItem)
        calculateTotalExpenses()
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
    updateLocalStorage()
}

//update localStorage
const updateLocalStorage = () => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
}     

const calculateTotalExpenses = () => {
    let total = 0
    expenses.forEach(function (expense, index){
        total += parseInt(expense.cost)
    })
    //Display Total Expenses
    const expenseTotal = document.querySelector('#total-expenses')
    expenseTotal.textContent = `Total Expenses $${total}`
}


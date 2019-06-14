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
        const removeExpense = document.createElement('button')

        // Create Button to Remove Expense
        removeExpense.setAttribute('class', 'delete-expense')
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

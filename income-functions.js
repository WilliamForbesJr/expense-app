//create array from localStorage to store expense objects
const getIncome = () => {
    const incomeJSON = localStorage.getItem('income')
    if (incomeJSON !== null) {
        return JSON.parse(incomeJSON)
    } else {
        return []
    }
}


//create DOM elements for expenses
const generateIncomeDOM = () => {
    incomeList.textContent = ''
    income.forEach(function (item, index) {
        const incomeItem = document.createElement('li')

        // Create Button to Remove Expense
        const removeIncomeButton = document.createElement('button')
        removeIncomeButton.setAttribute('class', 'delete-income')
        removeIncomeButton.textContent = 'X'

        //delete logic for button
        removeIncomeButton.addEventListener('click', () => {
            income.splice(index, index + 1)
            updateIncomeLocalStorage()
            generateIncomeDOM()
            calculateTotalIncome()
        })

        incomeItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
        incomeItem.appendChild(removeIncomeButton)
        incomeList.appendChild(incomeItem)
    })
}


// Update expenses 
const updateIncome = () => {
    const newIncome = {
        description: incomeDescription.value,
        amount: incomeAmountInput.value
    }
    income.push(newIncome)
    //clear inputs
    incomeDescription.value = ''
    incomeAmountInput.value = ''
    updateIncomeLocalStorage()
    calculateTotalIncome()
}

//update localStorage
const updateIncomeLocalStorage = () => {
    localStorage.setItem('income', JSON.stringify(income))
}

const calculateTotalIncome = () => {
    let incomeTotal = 0
    income.forEach(function (income, index) {
        incomeTotal += parseInt(income.amount)
    })

    //Display Total Expenses
    const incomeTotalEl = document.querySelector('#total-income')
    incomeTotalEl.textContent = `Total Income: $${incomeTotal}`
}

//create array from localStorage to store expense objects
const getIncome = () => {
    const incomeJSON = localStorage.getItem('income')
    if (incomeJSON !== null) {
        return JSON.parse(incomeJSON)
    } else {
        return []
    }
}


//create DOM elements for Income
const generateIncomeDOM = () => {
    incomeList.textContent = ''
    income.forEach(function (item, index) {
        const incomeItem = document.createElement('li')
        incomeItem.setAttribute('class', 'list-group-item')

        // Create Button to Remove Income
        const removeIncomeButton = document.createElement('button')
        removeIncomeButton.setAttribute('class', 'delete-income btn btn-danger btn-sm')
        removeIncomeButton.textContent = 'X'

        //delete logic for button
        removeIncomeButton.addEventListener('click', () => {
            income.splice(index, index + 1)
            updateIncomeLocalStorage()
            generateIncomeDOM()
        })

        incomeItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
        incomeItem.appendChild(removeIncomeButton)
        incomeList.appendChild(incomeItem)
        calculateTotalIncome()
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

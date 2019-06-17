//retreive data array from local storage
const getData = () => {
    const dataJSON = localStorage.getItem('data')
    if (dataJSON !== null) {
        return JSON.parse(dataJSON)
    } else {
        return []
    }
}

// Update local storage
const updateLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(data))
}     

const generateDOM = () => {
    clearDOM()
    calculateTotals()
    data.forEach(function(item, index){
        //define and setup each element
        const expenseItem = document.createElement('li')
        expenseItem.setAttribute('class', 'list-group-item')
        const incomeItem = document.createElement('li')
        incomeItem.setAttribute('class', 'list-group-item')

        const removeButton = document.createElement('button')
        removeButton.setAttribute('class', 'delete-expense btn btn-danger btn-sm')
        removeButton.textContent = 'X'
        //Delete Button Logic
        removeButton.addEventListener('click', () => {
            data.splice(index, index + 1)
            updateLocalStorage()
            generateDOM()
            //wait to see how to generate DOM before adding redundent function
        }) 
        //Sort data objects in DOM
        if (item.type === 'expense'){
            expenseItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
            expenseItem.appendChild(removeButton)
            expenseList.appendChild(expenseItem)
        } else if (item.type === 'income'){
            incomeItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
            incomeItem.appendChild(removeButton)
            incomeList.appendChild(incomeItem)
        }
    })
}

//create array containing income and expense objects
const updateData = (type, description, amount) => {
    const newItem = {
        type: type,
        description: description,
        amount: amount
    }
    data.push(newItem)
    updateLocalStorage()
    clearDOM()
}

const clearDOM = () => {
    //clear expense fields
    expenseInput.value = ''
    expenseAmountInput.value = ''
    expenseList.textContent = ''
    // clear income fields
    incomeAmountInput.value = ''
    incomeInput.value = ''
    incomeList.textContent = ''
}


const calculateTotals = () => {
    let totalExpenses = 0
    let totalIncome = 0
    //iterate through data array and add each object type
    data.forEach(function (item, index) {
        if (item.type === 'income') {
            totalIncome += parseInt(item.amount)
        } else if (item.type === 'expense'){
            totalExpenses += parseInt(item.amount)
        }
    })
    //Display Total Expenses
    const expenseTotal = document.querySelector('#total-expenses')
    expenseTotal.textContent = `Total Expenses $${totalExpenses}`
    const incomeTotal = document.querySelector('#total-income')
    incomeTotal.textContent = `Total Expenses $${totalIncome}`
}
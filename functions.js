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
    generateExpenseCategories(data)
    calculateTotals()
    loadIncomeDOM()
    loadExpenseDOM()
}

//create array containing income and expense objects
const updateData = (type, description, amount, category) => {
    //check for empty input
    if (isNaN(amount)) {
        amount = 0
    }
    const newItem = {
        type: type,
        description: description,
        amount: amount,
    }

    newItem.category = category
    data.push(newItem)
    updateLocalStorage()
    clearDOM()
}

const clearDOM = () => {
    //clear expense fields
    expenseInput.value = ''
    expenseAmountInput.value = ''
    expenseList.textContent = ''

    //category list with placeholder element
    expenseOptions.textContent = ''
    expenseCategoryInput.value = ''
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
    //Display Total Expense and Income
    const expenseTotal = document.querySelector('#total-expenses')
    expenseTotal.textContent = `Total Expenses $${totalExpenses}`
    const incomeTotal = document.querySelector('#total-income')
    incomeTotal.textContent = `Total Income $${totalIncome}`
    //Calculate Net Income
    const netIncome = document.querySelector('#net-income')
    netIncome.textContent = `Net Income: $${totalIncome - totalExpenses}`
}

const generateExpenseCategories = (data) => {
    //refresh filters array
    categoryArray.length = 0
    //create array for only categories
    const categories = data.map(function (item) {
        return item.category;
    });
    //check for duplicates
    const filteredCategories = categories.filter(function (item, index) {
        return categories.indexOf(item) >= index
    });

    //generate DOM element for expenses
    filteredCategories.forEach(function(item, index) {
        if (item !== undefined) {
            const option = document.createElement('option')
            option.value = item
            expenseOptions.append(option)
            categoryArray.push(item)
        }
    })
}


const loadExpenseDOM = () => { 
    //iterate through category array to find objects with matching category property.
    categoryArray.forEach(function (item, index) {
        
        //creates separate object arrays based on category array matching object.category
        const list = data.filter((data) => data.category !== undefined && data.category.indexOf(item) >= 0 && data.category.length === item.length)

        //setup each category and expense element
        const categoryList = document.createElement('div')
        categoryList.setAttribute('class', 'card my-3 shadow')

        //calculate total amounts for each category of expenses
        let categoryTotal = () => {
            let categoryTotal = 0
            list.forEach(function (item, index){
                categoryTotal += item.amount
            })
            return categoryTotal
        }
        
        categoryList.innerHTML = 
                `<div class="card-header expense-header"><h5>
                    ${item.toUpperCase()} </h5>
                    <span class="text-secondary">Total Spent:</span> <strong>  $${categoryTotal()} </strong>
                    <button id="income-submit" class="btn btn-success btn-sm float-right align-middle">Add Income</button>
                </div>`
        
        //iterate through each separate category list add expense elements
        list.forEach(function (item, index) {
            const expenseItem = document.createElement('li')
            expenseItem.setAttribute('class', 'list-group-item list-group-flush item transition')
            expenseItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
            expenseItem.appendChild(createDeleteButton(index))
            expenseList.appendChild(categoryList)
            categoryList.appendChild(expenseItem)

            toggleListView(categoryList, expenseItem)
        })
    })
}

const loadIncomeDOM = () => {
    data.forEach(function (item, index) {
        const incomeItem = document.createElement('li')
        incomeItem.setAttribute('class', 'list-group-item')
        //Sort data objects in DOM
        if (item.type === 'income') {
            incomeItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
            incomeItem.appendChild(createDeleteButton(index))
            incomeList.appendChild(incomeItem)
        }
    })
}


const createDeleteButton = (index) => {
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete-expense btn btn-danger btn-sm float-right')
    deleteButton.textContent = 'Delete'
    
    // delete logic for button
    deleteButton.addEventListener('click', () => {
        data.splice(index, 1)
        updateLocalStorage()
        generateDOM()
    })
    return deleteButton
}

const toggleListView = (list, item) => {
    list.addEventListener('click', () => {
        item.classList.toggle('hide')
        item.classList.toggle('transition')
        item.scrollIntoView({behavior: "smooth", block: "center"})
    })
}
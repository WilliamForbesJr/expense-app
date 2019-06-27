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
    generateExpenseCategories(data)
    clearDOM()
    calculateTotals()
    loadIncomeDOM()
    loadExpenseDOM()
}

//create array containing income and expense objects
const updateData = (type, description, amount, category) => {
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
    expenseCategoryList.textContent = ''
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
            const category = document.createElement('option')
            category.value = item
            expenseCategoryList.appendChild(category)
            categoryArray.push(item)
        }
    })
}


const loadExpenseDOM = () => { 
    
    categoryArray.forEach(function (item, index) {
        
        //creates separate object arrays based on category
        const list = data.filter((data) => data.category !== undefined && data.category.includes(item))

        //setup each category and expense element
        const categoryList = document.createElement('ul')
        categoryList.setAttribute('class', 'h5')
        categoryList.textContent = item
        
        //iterate through each separate category list add expense elements
        list.forEach(function (item, index) {
            const expenseItem = document.createElement('li')
            expenseItem.setAttribute('class', 'list-group-item')
            expenseItem.textContent = `Item:  ${item.description} Cost:  ${item.amount} Category ${item.category}`

            expenseList.appendChild(categoryList)
            categoryList.appendChild(expenseItem)
            
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
            incomeList.appendChild(incomeItem)
        }
    })
}



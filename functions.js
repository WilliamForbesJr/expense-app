//retreive data array from local storage
const getData = (data) => {
    const dataJSON = localStorage.getItem(data)
    if (dataJSON !== null) {
        return JSON.parse(dataJSON)
    } else {
        return []
    }
}

// Update local storage
const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}     

const generateDOM = () => {
    clearDOM()
    generateExpenseCategories(expenseData)
    calculateTotals()
    loadIncomeDOM()
    loadExpenseDOM()
    activeExpenseButtonListeners()
}

//create array containing income and expense objects
const updateData = (type, description, amount, category) => {
    //check for empty input
    if (isNaN(amount)) {
        amount = 0
    }
    const newTransaction = {
        description: description,
        amount: amount,
        category: category
    }
    if (type ==='expense'){
        expenseData.push(newTransaction)
        updateLocalStorage('expense', expenseData)
    } else if (type === 'income') {
        incomeData.push(newTransaction)
        updateLocalStorage('income', incomeData)
    }

    clearDOM()
}

const clearDOM = () => {
    //clear expense fields
    expenseForm.reset()
    expenseList.textContent = ''

    //category list with placeholder element
    expenseOptions.textContent = ''
    // clear income fields
    incomeAmountInput.value = ''
    incomeInput.value = ''
    incomeList.textContent = ''
}

const calculateTotals = () => {
    let totalExpenses = 0
    let totalIncome = 0
    //iterate through data array and add each object type
    expenseData.forEach(function (item, index) {
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
    //check if there are any expenses to load. if not, ensure the add expense is visible 
    if (categoryArray.length === 0){
        toggleElementVisability(addExpenseContainer)
    }
    //iterate through category array to find objects with matching category property.
    categoryArray.forEach(function (item, index) {
        //creates separate object arrays based on category array matching object.category
        const list = expenseData.filter((data) => data.category !== undefined && data.category.indexOf(item) >= 0 && data.category.length === item.length)
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
                `<div class="card-header expense-header cat-${item} d-flex justify-content-between">
                    <div>
                        <h5 id=cat-item-${item}>${item.toUpperCase()}</h5>
                        <span class="text-secondary">Total Spent:</span>  $${categoryTotal()} 
                    </div>
                        <button class="category-button btn btn-success btn-sm">Add Expense</button>
                </div>`

        //iterate through each separate category list add expense elements
        list.forEach(function (item, index) {
            const expenseItem = document.createElement('li') 
            expenseItem.setAttribute('class', 'list-group-item hide d-flex justify-content-between expense-items')
            expenseItem.innerHTML = 
                                    `<div>
                                        <p class="h6 item-description">${item.description} </p> 
                                        $${item.amount}
                                    </div>`
                                    
            expenseItem.appendChild(createDeleteButton(index, expenseData, 'expense'))
            expenseList.appendChild(categoryList)
            categoryList.appendChild(expenseItem)

            // toggle visability of children elements when clicking on expenseHeader
            const expenseHeader = document.querySelector(`.cat-${item.category}`)
            expenseHeader.addEventListener('click', (e) => {
                if (expenseCategoryInput.value !== '' || addExpenseContainer.classList.contains('transition')){
                    toggleElementVisability(addExpenseContainer)
                    expenseCategoryInput.value = ''
                }
                toggleElementVisability(expenseItem)
                expenseItem.scrollIntoView({ behavior: "smooth", block: "center" })
                e.stopPropagation()
            })
        })
    })
}

const loadIncomeDOM = () => {
    incomeData.forEach(function (item, index) {
        const incomeItem = document.createElement('li')
        incomeItem.setAttribute('class', 'list-group-item')
        //Sort data objects in DOM
            incomeItem.textContent = `Item:  ${item.description} Cost:  ${item.amount}`
            incomeItem.appendChild(createDeleteButton(index, incomeData, 'income'))
            incomeList.appendChild(incomeItem)
    })
}

const createDeleteButton = (index, dataType, key) => {
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete-expense btn btn-danger btn-sm')
    deleteButton.textContent = 'Delete'
    
    // delete logic for button
    deleteButton.addEventListener('click', (e) => {
        dataType.splice(index, 1)
        updateLocalStorage(key, dataType)
        deleteButton.parentNode.classList.add('fade-out')
        setTimeout(() => {
            generateDOM()
        }, 600);
    })
    return deleteButton
}

//show or hide expense lists when expense category is clicked
const toggleElementVisability = (eventElement) => {
        eventElement.classList.toggle('hide')
        eventElement.classList.toggle('transition')
    }

const activeExpenseButtonListeners = () => {
    document.querySelectorAll('.category-button').forEach((categoryButton) => {
        categoryButton.addEventListener('click', (e) => {
            // Check if addExpenseContainer is visible and toggle, if not
            if (expenseCategoryInput.value === '' && addExpenseContainer.classList.contains('hide')) {
                toggleElementVisability(addExpenseContainer, addExpenseContainer)
            }
            //autocomplete expense category field with selected category
            expenseCategoryInput.value = categoryButton.parentNode.querySelector('h5').textContent.toLowerCase()
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
}

/* Category object:
    Category: name
    category: budget
*/
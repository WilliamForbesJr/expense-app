var expenseManager = (function() {
  const data = {
    income: [],
    expenses: [],
  };

  return {
      // Here we can just return our `data` bc we've instantiated it essentially as an empty array
      // so we don't have to worry about a null or undefined value
      getData: function() {
          return data;
      },
      
      addItem: function(type, description, amount, category) {
        if (isNaN(amount)) {
          amount = 0;
        }

        const newItem = {
          type: type,
          description: description,
          amount: amount,
          category: category
        };

        data.push(newItem);
      },
      
      calculateTotal: function(values) {
        // One of the most useful functions to use with arrays
        return values.reduce(function(acc, cur) {
          return acc += parseInt(cur.amount);
        });
      },

      getGrossIncome: function() {
        return this.calculateTotal(data.income);
      },

      getTotalExpenses: function() {
        return this.calculateTotal(data.expenses);
      },

      getNetIncome: function () {
        return this.getGrossIncome() - this.getTotalExpenses();
      }

  };
})();

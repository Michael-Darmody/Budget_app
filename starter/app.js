
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, description, value) {
      var newItem, id;
      // Creates a new ID
      if(data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length -1].id + 1;
      } else {
        id = 0
      }

      // Creates an expense or income object based on type
      if(type === 'exp') {
        newItem = new Expense(id, description, value);
      } else if(type === 'inc') {
        newItem = new Income(id, description, value);
      }
      // Pushes object into data structure and returns the item
      data.allItems[type].push(newItem);
      return newItem;
    }
  }
})();

var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
  };

  return {
    getInput: function() {
      return {
         type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
         description: document.querySelector(DOMStrings.inputDescription).value,
         value: document.querySelector(DOMStrings.inputValue).value
      }
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text

      if(type === 'inc') {
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if(type === 'exp') {
        element = DOMStrings.expenseContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) {
        current.value = '';
      });

      fieldsArray[0].focus();
    },

    getDOMStrings: function() {
      return DOMStrings
    }
  };
})();

var  appController = (function(budgetCtrl, UICtrl) {

  var setUpEventListeners = function() {
    var DOM = UICtrl.getDOMStrings()

    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem

    // 1. Get the field input data
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI and clear input
    UICtrl.addListItem(newItem, input.type)
    UICtrl.clearFields()

    // 4. Calculate the budget

    // 5. Display the budget on the UI

  };

  return {
    init: function() {
      console.log('Application has started')
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

appController.init();  // Starts the application

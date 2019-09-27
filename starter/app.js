
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
    },

    testing: function() {
      console.log(data)
    }
  }
})();

var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn'
  };

  return {
    getInput: function() {
      return {
         type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
         description: document.querySelector(DOMStrings.inputDescription).value,
         value: document.querySelector(DOMStrings.inputValue).value
      }
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

    // 3. Add the item to the UI

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

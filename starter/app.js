
var budgetController = (function() {
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Incomes = function(id, description, value) {
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

    // 1. Get the field input data
    var input = UICtrl.getInput();

    // 2. Add the item to the budget controller

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

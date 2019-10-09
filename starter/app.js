
var  appController = (function(budgetCtrl, UICtrl) {

  var setUpEventListeners = function() {
    var DOM = UICtrl.getDOMStrings()

    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
  };

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    // 1. Calculate the percentages
    budgetCtrl.calculatePercentages();

    // 2. Return the percentages from budget controller
    percentages = budgetCtrl.getPercentages();

    // 3. Display the percentages on the UI
    UICtrl.displayPercentages(percentages);
  }

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, id;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      id = parseInt(splitID[1]);

      // 1. Delete object from data structure
      budgetCtrl.deleteItem(type, id);

      // 2. Delete item from UI
      UICtrl.deleteListItem(itemID);

      // 3. Update the budget on the UI
      updateBudget();

      // 4. Update the percentage on the UI
      updatePercentages();
    }
  };

  var ctrlAddItem = function() {
    var input, newItem

    // 1. Get the field input data
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI and clear input
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();

      // 4. Calculate and update budget
      updateBudget();

      // 5. Calculate and update percentages
      updatePercentages();
    };

  };

  var startValues = {
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1
  }

  return {
    init: function() {
      console.log('Application has started')
      UICtrl.displayDate();
      UICtrl.displayBudget(startValues);
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

appController.init();  // Starts the application

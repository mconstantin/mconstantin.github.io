(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService']
function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.doBuy = ShoppingListCheckOffService.buy;
};

AlreadyBoughtShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService']
function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();
};

function ShoppingListCheckOffService() {
  var service = this;

  var toBuy = [
    {
      name: "Cookies bag(s)",
      quantity: 4
    },
    {
      name: "Chips bag(s)",
      quantity: 6
    },
    {
      name: "Wings box(es)",
      quantity: 2
    },
    {
      name: "Pizza(s)",
      quantity: 5
    },
    {
      name: "Popcorn bag(s)",
      quantity: 2
    },
  ];

  var bought = [];

  service.getToBuyItems = function() {
    return toBuy;
  };

  service.getBoughtItems = function() {
    return bought;
  };

  service.buy = function(itemIndex) {
    if (toBuy.length == 0) return;
    bought.push(toBuy[itemIndex]);
    toBuy.splice(itemIndex, 1);
  }
}
})();

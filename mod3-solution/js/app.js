(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('baseUrl', "https://davids-restaurant.herokuapp.com/");

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var ctrl = this;
  ctrl.search = "";
  ctrl.found = [];
  ctrl.show_empty_search = false;

  $scope.$watch(function(scope) {
      return (ctrl.search);
    },
    function(newValue, oldValue) {
      newValue = newValue || "";
      ctrl.show_empty_search = oldValue && newValue.trim().length === 0;
  });

  ctrl.findMenuItems = function() {
    // clear results
    ctrl.found = [];
    // nothing to search if search term is empty
    if (ctrl.search.trim().length === 0) {
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(ctrl.search);
    promise.then(function(result) {
      ctrl.found = result;
    })
    .catch(function(error) {
      console.log("error getting menu items: " + error);
    });
  };

  ctrl.removeItem = function(itemIndex) {
    this.found.splice(itemIndex, 1);
  }
};

MenuSearchService.$inject = ['$http', 'baseUrl'];
function MenuSearchService($http, baseUrl) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var foundItems = [];
    return $http.get(baseUrl + "menu_items.json")
    .then(function(response) {
      for (var i = 0; i < response.data.menu_items.length; i++) {
        var item = response.data.menu_items[i];
        if (item.description.indexOf(searchTerm) != -1) {
          foundItems.push(item);
        }
      }
      return foundItems;
    });
  }
};

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'templates/foundItems.html',
    scope: {
      items: '=',
      onRemove: '&removeItem'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'itemsCtrl',
    bindToController: true
  };

  return ddo;
};

FoundItemsDirectiveController.$inject = ['$scope'];
function FoundItemsDirectiveController($scope) {
  var itemsCtrl = this;
  itemsCtrl.items = undefined;
  itemsCtrl.show_empty_result = false;

  $scope.$watch('itemsCtrl.items', function(newValue, oldValue) {
      itemsCtrl.show_empty_result = oldValue && newValue.length === 0;
  });
};

})();

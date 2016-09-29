(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective)
.constant('baseUrl', "https://davids-restaurant.herokuapp.com/");

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var ctrl = this;
  ctrl.search = "";
  // ctrl.found = [];
  ctrl.show_empty_search = false;
  ctrl.loading = false;

  $scope.$watch(function(scope) {
      return (ctrl.search);
    },
    function(newValue, oldValue) {
      // newValue = newValue || "";
      // ctrl.show_empty_search = oldValue && newValue.trim().length === 0;
      // reset empty search warning until user clicks the find button again
      ctrl.show_empty_search = false;
      ctrl.found = undefined;
  });

  ctrl.findMenuItems = function() {
    // clear results
    ctrl.found = [];
    // nothing to search if search term is empty
    if (ctrl.search.trim().length === 0) {
      ctrl.show_empty_search = true;
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(ctrl.search);
    ctrl.loading = true;
    promise.then(function(result) {
      ctrl.found = result;
    })
    .catch(function(error) {
      console.log("error getting menu items: " + error);
    })
    .finally(function() {
      ctrl.loading = false;
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
      loading: '=',
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
      itemsCtrl.show_empty_result = oldValue && newValue && newValue.length === 0 && !itemsCtrl.loading;
  });
};

function ItemsLoaderIndicatorDirective() {
  var ddo = {
    template: "<div><span><i class='fa fa-spinner fa-spin '></i> Loading...</span></div>",
    link: link
  };

  function link(scope, element, attrs) {
    var ctrl = scope.ctrl;

    function show(isLoading) {
      if (isLoading)
        element.css('display', 'block');
      else {
        element.css('display', 'none');
      }
    };

    scope.$watch('ctrl.loading', function(newValue, oldValue) {
      show(newValue);
    });
  };

  return ddo;
};

})();

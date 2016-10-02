(function() {
  'use strict';

  angular.module('MenuData')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    this.getAllCategories = function() {
      return $http.get("https://davids-restaurant.herokuapp.com/categories.json");
    };

    this.getItemsForCategory = function(shortCategoryName) {
      return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json",
        {
          params: { category: shortCategoryName}
        }
      );
    };
  }
})();

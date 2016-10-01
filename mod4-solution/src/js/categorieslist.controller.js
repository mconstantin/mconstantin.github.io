(function() {
  'use strict';

  angular.module('MenuData')
  .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['items'];
  function CategoriesListController(items) {
    this.items = items;
  }
})();

(function() {
  'use strict';

  angular.module('MenuData')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['menuitems'];
  function MenuItemsController(menuitems) {
    this.menuitems = menuitems.data.menu_items;
    this.catname = menuitems.data.category.name;
  };

})();

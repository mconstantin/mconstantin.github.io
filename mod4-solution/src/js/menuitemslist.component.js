(function () {
'use strict';

angular.module('MenuData')
.component('menuitemsList', {
  templateUrl: 'src/templates/menuitemslist.template.html',
  bindings: {
    items: '<'
  }
});

})();

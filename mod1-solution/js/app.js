(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope']
function LunchCheckController($scope) {
  $scope.checkItems = function() {
    var count = 0;
    var items = [];
    if ($scope.items && $scope.items.trim() != "") {
      var items = $scope.items.split(',');

      for (var i=0; i < items.length; i++) {
        if (items[i].trim() != "")
          count++;
      };
    }
    if (count == 0 || count != items.length) {
      $scope.message = "Please enter correct data";
      $scope.msgColor = "red";
      $scope.borderColor = "red";
    }
    else if (count < 4) {
      $scope.message = "Enjoy!";
      $scope.msgColor = "green";
      $scope.borderColor = "green";
    }
    else {
      $scope.message = "Too much!";
      $scope.msgColor = "green";
      $scope.borderColor = "green";
    }
  }
};

})();

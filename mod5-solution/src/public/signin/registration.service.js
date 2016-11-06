(function() {
  angular.module('public')
  .service('RegistrationService', RegistrationService);

  RegistrationService.$inject = ['ApiPath', '$http'];

  function RegistrationService(ApiPath, $http) {
    var service = this;
    var registrationData = {};

    service.register = function(registration) {
      registrationData = registration;
      console.log('registration data: ', registrationData);
    };

    service.getRegistration = function() {
      return registrationData;
    };

    service.delete = function() {
      registrationData = {};
    };

    service.isRegistered = function() {
      return !angular.equals(registrationData, {});
    };

    service.validateMenuItem = function(shortName) {
      return $http.get(ApiPath + '/menu_items/' + shortName + '.json');
    };
  }
})();

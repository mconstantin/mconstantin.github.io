(function() {
  angular.module('public')
  .controller('RegistrationInfoController', RegistrationInfoController);

  RegistrationInfoController.$inject = ['registration', 'ApiPath', 'RegistrationService'];

  function RegistrationInfoController(registration, ApiPath, RegistrationService) {
    var reginfoCtrl = this;

    reginfoCtrl.reg = registration;
    reginfoCtrl.ApiPath = ApiPath;
    reginfoCtrl.registered = RegistrationService.isRegistered();

    reginfoCtrl.delete = function() {
      RegistrationService.delete();
      reginfoCtrl.registered = false;
    };
  };
})();

(function() {
  angular.module('public')
  .controller('SignInController', SignInController);

  SignInController.$inject = ['RegistrationService'];

  function SignInController(RegistrationService) {
    var signinCtrl = this;

    signinCtrl.valid = false;
    signinCtrl.submitted = false;
    signinCtrl.reg = RegistrationService.getRegistration();

    // $scope.showDialog = function() {
    //     ModalService.showModal({
    //         templateUrl: 'signin.dialog.html',
    //         controller: "ModalController"
    //     }).then(function(modal) {
    //         modal.element.modal();
    //         modal.close.then(function(result) {
    //             $scope.message = "You said " + result;
    //         });
    //     });
    // };

    signinCtrl.regexp = /^\(\d{3}\)[ .-]\d{3}[ .-]\d{4}$/;

    signinCtrl.save = function() {
      var shortName;
      if (signinCtrl.reg.favdish) {
        shortName = signinCtrl.reg.favdish.short_name;
      };
      
      signinCtrl.submitted = true;
      if (shortName) {
        var result = RegistrationService.validateMenuItem(shortName);
        result.then(
          function(response) {
            signinCtrl.valid = true;
            signinCtrl.reg.favdish = {
              short_name: shortName,
              name: response.data.name,
              description: response.data.description,
              image_present: response.data.image_present
            }
            RegistrationService.register(signinCtrl.reg);
          });
        }
        else {
          signinCtrl.valid = true;
          RegistrationService.register(signinCtrl.reg);
        };
      }
  };
})();

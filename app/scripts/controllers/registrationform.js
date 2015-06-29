'use strict';

angular.module('stormpathIdpApp')
  .controller('RegistrationFormCtrl', function ($scope,Stormpath) {

    $scope.fields = {};

    $scope.submit = function(){
      var ad = /(.*)@ice-energy\.com/;
      $scope.unknownError = false;
	  $scope.adUser = false;
      var inError = Object.keys($scope.fields).filter(function(f){
        var field = $scope.fields[f];
        return field.validate();
      });
      var data = Object.keys($scope.fields).reduce(function(acc,f){
        acc[f] = $scope.fields[f].value;
        return acc;
      },{});
      delete data.passwordConfirm;
      if(inError.length===0){
		  if (ad.test(data.email))
			  $scope.adError = true;
		  else
    		  Stormpath.register(data,function(err){
			    if(err){
                  if(err.status===409){
                    $scope.fields.email.setError('duplicateUser', true);
                }else{
                  $scope.unknownError = err.status;
                }
              }
          });
      }
    };

	window.setTimeout(function() {
		document.getElementById("givenName").focus();
	}, 0);
  });

'use strict';

angular.module('stormpathIdpApp')
  .controller('ForgotCtrl', function ($scope,Stormpath,$routeParams,$rootScope) {
    $scope.sent = false;
    $scope.retry = $routeParams.retry || false;
    $scope.fields = {};
    $rootScope.$on('$locationChangeStart',function(e){
      if($scope.sent){
        e.preventDefault();
      }
    });
    $scope.submit = function(){
      $scope.notFound = false;
      $scope.adError = false;
      var inError = Object.keys($scope.fields).filter(function(f){
        return $scope.fields[f].validate();
      });
      if(inError.length>0){
        return;
      }
      Stormpath.sendPasswordResetEmail($scope.fields.email.value.trim(),function(err){
        if(err){
          if(err.status===400){
			$scope.adError = true;
          }else{
            $scope.unknownError = err.status + ":" + err.message;
          }
        }else{
          $scope.sent = true;
        }
      });
    };
	window.setTimeout(function() {
		document.getElementById("forgotemail").focus();
	}, 0);
  });

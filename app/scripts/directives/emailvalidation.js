'use strict';

angular.module('stormpathIdpApp')
  .directive('emailValidation', function () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var ad = /(.*)@ice-energy\.com/;
    return {
      restrict: 'A',
      link: function postLink(scope) {
        scope.errors = {
          duplicateUser: false,
		  badEmailAddress: false,
		  adUser: false
        };
        scope.setError = function(k,v){
          scope.errors[k] = v;
        };
        scope.errorCount = function(){
          return Object.keys(scope.errors).filter(function(k){
            return scope.errors[k];
          }).length;
        };
        scope.validate = function(element){
          scope.clearErrors();
          var val = element.val().trim();
          var tests =  [
            ['badEmailAddress' , function(){ return !re.test(val);}],
            ['adUser' , function(){ return ad.test(val);}]
          ];
		  
          for(var i=0;i<tests.length;i++){
            scope.errors[tests[i][0]] = tests[i][1](val);
            if(scope.errorCount()>0){
              break;
            }
          }

          scope.validationError = scope.errorCount() > 0 ;
          return scope.validationError;
        };
      }
    };
  });

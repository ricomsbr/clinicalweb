;
(function(angular) {
	'use strict';
	
	angular
		.module('app.shared')
		.directive('focusMe', focusMe);
	
	focusMe.$inject = ['$timeout'];
	
	function focusMe($timeout) {
		return {
		    link: function(scope, element, attrs) {
		      scope.$watch(attrs.focusMe, function() {		       
		            element[0].focus();
		      });
		    }
		  };
		}

})(angular);

//if(value === true) { 
  //  console.log('value=',value);
    //$timeout(function() {
    //  element[0].focus();
      //scope[attrs.focusMe] = false;
    //});
  //}
;
(function(angular) {
	'use strict';

	angular.module('app.shared').directive('allowedRoles', allowedRoles);
	
	function allowedRoles() {
		var directive = {
			restrict : 'A',
			link : link
		};

		return directive;

		function link(scope, element, attrs) {
			
			var user = scope.vm.user;
			var roles = attrs.allowedRoles.split(",");
			var aut = user.authorities;
			var show = false;
			
			angular.forEach(roles, function(value, key){
				if(!show) {
					angular.forEach(aut, function(v,k) {
				    	if(!show && v.authority.match(value)){
				    		show = true;
				    	}
				    }); 
				}
			});
			
			if(!show) {
				element.remove();
			}
		}
	}

})(angular);
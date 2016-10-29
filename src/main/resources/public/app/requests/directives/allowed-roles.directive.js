;
(function(angular) {
	'use strict';

	angular.module('app.shared').directive('allowedRoles', allowedRoles);
	
	allowedRoles.$inject = ['userService'];

	function allowedRoles(userService) {
		var directive = {
			restrict : 'A',
			link : link
		};

		return directive;

		function link(scope, element, attrs) {
			
			var promise = userService.getUser();
			
			promise.then(function(user) {
				var roles = attrs.allowedRoles.split(",");
				var aut = user.authorities;
				var show = false;
				
				angular.forEach(roles, function(value, key){
					if(!show) {
					    angular.forEach(aut, function(v,k) {
					    	if(v.authority.match(value)){
					    		show = true;
					    	}
					    }); 
					}
				});
				
				if(!show) {
					element.remove();
				}
			});
		}
	}

})(angular);
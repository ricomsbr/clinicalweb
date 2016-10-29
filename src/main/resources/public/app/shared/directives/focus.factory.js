(function() {
	angular.module('app.shared').factory('focus',
			function($rootScope, $timeout) {
				return function(name) {
					$timeout(function() {
						$rootScope.$broadcast('focusOn', name);
					});
				};
			});
})();
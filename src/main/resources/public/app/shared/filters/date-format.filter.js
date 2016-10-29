(function() {
	'use strict';
	angular.module('app.shared').filter(
			'formatDate',
			function() {
				return function(input) {
					return input.substring(8, 10) + "/" + input.substring(5, 7)
							+ "/" + input.substring(0, 4);
				};
			})
})();
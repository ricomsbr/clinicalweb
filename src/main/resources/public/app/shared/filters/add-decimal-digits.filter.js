(function() {
	'use strict';
	angular.module('app.shared').filter('addDecimalDigits', function() {
		return function(value) {
			if ((value.indexOf(".")==-1) && (value.indexOf(",")==-1)) {
				value = value.concat(".00");
			}
			return value;

		};
	})
})();
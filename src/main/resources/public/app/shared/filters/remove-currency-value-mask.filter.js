(function() {
	'use strict';
	angular.module('app.shared').filter('removeCurrencyValueMask', function() {
		return function(value) {
			if (value != undefined) {
				value = value.split(".").join("");
				value = value.replace(",", ".");
			}
			return value;

		};
	})
})();
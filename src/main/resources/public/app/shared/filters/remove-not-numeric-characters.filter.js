(function() {
	'use strict';
	angular.module('app.shared').filter(
			'removeNotNumericCharacters',
			function() {
				return function(input) {
					var numberPattern = /\d+/g;
					var processNumber = input.match(numberPattern);
					processNumber = processNumber.toString().split(",")
							.join("");
					return processNumber;
				};
			});
})();
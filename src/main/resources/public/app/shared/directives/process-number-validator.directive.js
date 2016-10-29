;
(function(angular) {
	'use strict';

	angular.module('app.shared').directive('fpProcessNumberValidator',
			processNumberValidator);

	function processNumberValidator() {
		var directive = {
			require : 'ngModel',
			restrict : 'A',
			link : link
		};

		return directive;

		// //////

		function link(scope, element, attrs, ctrl) {
			var REGEX = /^(\d{2}|\d{4})\/?(\d{5})-?(\d{1})$/;

			function parser(viewValue) {
				var match = REGEX.exec(viewValue) || false;
				if (match) {
					if (match[1].length === 2) {
						var year = parseInt(match[1]);
						if (year < 63) {
							match[1] = '20' + match[1];
						} else {
							match[1] = '19' + match[1];
						}
					}
					return match[1] + match[2] + match[3];
				}
				return "";
			}

			function checksum(modelValue) {

				var pattern = /^\d{10}$/;
				if (!pattern.test(modelValue)) {
					return false;
				}

				if (modelValue.indexOf("/") != -1)
					modelValue.replace("/", "");
				if (modelValue.indexOf("-") != -1)
					modelValue.replace("-", "");

				var mult = [ 2, 3, 8, 4, 5, 6, 7 ];
				var check_digit = 0;
				for (var i = 0; i < mult.length; i++) {
					check_digit = check_digit
							+ (parseInt(modelValue[i + 2]) * mult[i]);
				}
				check_digit = (check_digit % 11) % 10;
				if (check_digit === parseInt(modelValue[9])) {
					return true;
				}
				return false;
			}

			ctrl.$parsers.push(parser);
			ctrl.$validators.checksum = checksum;

		}
	}

})(angular);
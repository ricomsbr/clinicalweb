(function() {
	'use strict';
	angular.module('app.shared')
	.filter(
			'formatProcessNumber',
			function() {
				return function(value) {
					var formatted = null;
					if (!value)
						return '';
					formatted = value.toString();
					if (formatted.length != 10)
						return formatted;

					formatted = formatted.substring(0, 4) + '/'
							+ formatted.substring(4, 9) + '-'
							+ formatted.substring(9);

					return formatted;
				};
			})
	.filter('removeProcessNumberFormat',
		function() {
		return function(value) {
			var formatted = null;
			if (!value)
				return '';
			formatted = value.toString();
			if (formatted.length != 12)
				return formatted;

			formatted = formatted.replace(/(\d{4})\/(\d{5})-(\d)/g, "$1$2$3");

			return formatted;
		};	
		
	})
})();
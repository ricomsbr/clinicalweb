(function() {
	'use strict';
	angular.module('app.shared').filter(
			'formatCpf',
			function() {
				return function(value) {
					var formatted = null;
					if (!value)
						return '';
					formatted = value;
					if (formatted.length != 11)
						return formatted;

					formatted = formatted.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/g, "$1.$2.$3-$4");

					return formatted;
				};
			})
})();



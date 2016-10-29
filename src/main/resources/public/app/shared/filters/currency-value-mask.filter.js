(function() {
	'use strict';
	angular.module('app.shared').filter('currencyValueMask', function() {
		return function(value, maxsize) {
			if (value != undefined) {
				if (value.length > maxsize) {
					value = value.substring(0, maxsize);
				}
				value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
				value = value.replace(/(\d{2})$/, ",$1"); // Coloca a virgula
				value = value.replace(/(\d+)(\d{3},\d{2})$/g, "$1.$2"); // Coloca o primeiro ponto
				var qtdLoop = (value.length - 3) / 3;
				var count = 0;
				while (qtdLoop > count) {
					count++;
					value = value.replace(/(\d+)(\d{3}.*)/, "$1.$2"); // Coloca o resto dos pontos
				}
			}
			return value;
		};
	})
})();
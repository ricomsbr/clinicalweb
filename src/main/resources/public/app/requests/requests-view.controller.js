(function(angular) {
	'use strict';
	angular
		.module('app.requests')
		.controller('RequestsViewController', RequestsViewController);
	
	RequestsViewController.$inject = ['processNumber',"$rootScope"];
	
	function RequestsViewController(processNumber,$rootScope) {
		var vm = this;
		vm.procNumber = processNumber;
		$rootScope.pageName = "Solicitação de Liberação de Verba";
	}
})(angular);
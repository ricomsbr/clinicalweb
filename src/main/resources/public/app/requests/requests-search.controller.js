;
(function(angular) {
	'use strict';
	angular.module('app.requests').controller('RequestsSearchController',
			RequestsSearchController);

	RequestsSearchController.$inject = [ '$state', 'processService','$rootScope' ];

	function RequestsSearchController($state, processService, $rootScope) {
		var vm = this;
		vm.submit = submit;
		vm.clear = clear;
		$rootScope.pageName = "Solicitação de Liberação de Verba";

		activate();

		function activate() {
			vm.pending = false;
			vm.process_number = null;
			vm.msg = null;
			vm.showMsg = false;
		}

		function submit(valid, event) {
			console.log('submit');
			vm.pending = true;
			vm.showMsg = false;
			
			var promise = processService.get(vm.process_number);
			promise.then(function(process) {
				$state.go('main.requests.requests-view', {
				processNumber : vm.process_number});
			}, function(reason) {
				showMessage(reason.data.message);
			});
		}

		function showMessage(message) {
			vm.msg = message;
			vm.showMsg = true;
		}

		function clear(form) {
			vm.process_number = null;
			vm.msg = null;
			vm.showMsg = false;
		}

	}

})(angular);
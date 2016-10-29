;
(function(angular) {
	'use strict';
	angular
		.module('app.patient')
		.controller('PatientController', PatientController);

	PatientController.$inject = [ '$state', 'patientService','$rootScope' ];

	function PatientController($state, patientService, $rootScope) {
		var vm = this;
		vm.submit = submit;
		vm.clear = clear;
		$rootScope.pageName = "Cadastro de Pacientes";

		activate();

		function activate() {
			vm.pending = false;
			vm.patient_name = null;
			vm.msg = null;
			vm.showMsg = false;
		}

		function submit(valid, event) {
			console.log('submit');
			vm.pending = true;
			vm.showMsg = false;
			
			var promise = patientService.get(vm.patient_name);
			promise.then(function(patient) {
				$state.go('main.patient.view', {
				patientName : vm.patient_name});
			}, function(reason) {
				showMessage(reason.data.message);
			});
		}

		function showMessage(message) {
			vm.msg = message;
			vm.showMsg = true;
		}

		function clear(form) {
			vm.patient_name = null;
			vm.msg = null;
			vm.showMsg = false;
		}

	}

})(angular);
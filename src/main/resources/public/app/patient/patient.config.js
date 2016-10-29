;
(function(angular) {
	'use strict';
	angular
		.module('app.patient')
		.config(PatientConfig);
	
	PatientConfig.$inject = ['$stateProvider'];
	
	function PatientConfig($stateProvider) {
		$stateProvider
		.state('main.patient', {
			abstract: true,
			templateUrl: 'app/patient/patient.html'
		})
		.state('main.patient.view', {
			url: '/patient',
			templateUrl: 'app/patient/patient-view.html',
			controller: 'PatientController',
			controllerAs: 'view',
			data: {
				title: 'Incluir/Excluir Paciente(s)'
			}
		})
		;
	}
	
})(angular);
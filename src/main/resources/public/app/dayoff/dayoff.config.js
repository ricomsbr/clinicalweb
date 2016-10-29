;
(function(angular) {
	'use strict';
	angular
		.module('app.dayoff')
		.config(DayoffConfig);
	
	DayoffConfig.$inject = ['$stateProvider'];
	
	function DayoffConfig($stateProvider) {
		$stateProvider
		.state('main.dayoff', {
			abstract: true,
			templateUrl: 'app/dayoff/dayoff.html'
		})
		.state('main.dayoff.view', {
			url: '/dayoff',
			templateUrl: 'app/dayoff/dayoff-view.html',
			controller: 'DayoffController',
			controllerAs: 'view',
			data: {
				title: 'Incluir/Excluir Feriado(s)'
			}
		})
		;
	}
	
})(angular);
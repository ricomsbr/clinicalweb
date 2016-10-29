;
(function(angular) {
	'use strict';
	angular
		.module('app.requests')
		.config(RequestsConfig);
	
	RequestsConfig.$inject = ['$stateProvider'];
	
	function RequestsConfig($stateProvider) {
		$stateProvider
			.state('main.requests', {
				abstract: true,
				templateUrl: 'app/requests/requests.html'
			})
			.state('main.requests.requests-search', {
				url: '/requests-search',
				templateUrl: 'app/requests/requests-search.html',
				controller: 'RequestsSearchController',
				controllerAs: 'searchVm',
				data: {
					title: 'Solicitação de Liberação de Verba'
				}
			})
			.state('main.requests.requests-view', {
				url: '/requests/:processNumber',
				templateUrl: 'app/requests/requests-view.html',
				controller: 'RequestsViewController',
				controllerAs: 'viewVm',
				resolve: {
					processNumber: ['$stateParams', function($stateParams) {
						return $stateParams.processNumber;
					}]  
				},
				data: {
					title: 'Solicitação de Liberação de Verba'
				}
				
			})
			.state('main.requests.submit-requests', {
				url: '/submit-requests',
				templateUrl: 'app/requests/submit-requests.html',
				data: {
					title: 'Enviar Solicitações ao DAP'
				}
			})
			;
	}
	
})(angular);
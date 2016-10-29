;
(function(angular) {
	'use strict';
	angular
		.module('app.requests-to-approval')
		.config(RequestsToApprovalConfig);
	
	RequestsToApprovalConfig.$inject = ['$stateProvider'];
	
	function RequestsToApprovalConfig($stateProvider) {
		$stateProvider
		.state('main.requests-to-approval', {
			abstract: true,
			templateUrl: 'app/requests/requests-to-approval.html'
		})
		.state('main.requests-to-approval.view', {
			url: '/requests-to-approval',
			templateUrl: 'app/requests/requests-to-approval-view.html',
			controller: 'RequestsToApprovalController',
			controllerAs: 'view',
			data: {
				title: 'Solicitações Pendentes'
			}
		})
		;
	}
	
})(angular);
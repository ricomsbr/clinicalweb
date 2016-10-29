;
(function(angular) {
	'use strict';
	
	angular.module('app.dashboard').config(DashboardConfig);
	
	DashboardConfig.$inject = ['$stateProvider'];
	
	function DashboardConfig($stateProvider) {
		$stateProvider
			.state('main.dashboard', {
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html',
				data: {
					title: 'Dashboard'
				}
			});
	}
})(angular);
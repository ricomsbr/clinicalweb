;
(function(angular) {
	'use strict';
	angular
		.module('app.interceptor')
		.config(InterceptorConfig);
	
	InterceptorConfig.$inject = ['$httpProvider','$stateProvider'];
	
	function InterceptorConfig($httpProvider,$stateProvider) {
		$httpProvider.interceptors.push('interceptorService');
		
		$stateProvider.state('main.error', {
			url: '/denied',
			templateUrl: 'app/error/denied.html'
		});
	}
	
})(angular);
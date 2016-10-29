;
(function (angular) {
	'use strict'
	angular.module('app.main').config(MainConfig);
	
	MainConfig.$inject = [ '$stateProvider', '$urlRouterProvider'];
	
	function MainConfig($stateProvider, $urlRouterProvider) {
		$stateProvider.state({
			name : 'main',
			abstract: true,
			url: '/app',
			component : 'appMain',
			resolve : {
				mainService: 'mainService',
				userService : 'userService',
				user : [ 'userService', function(userService) {
					return userService.getUser();
				} ]
			}
		});
		
		$urlRouterProvider.otherwise(function ($injector, $location) {
			var $state = $injector.get('$state');
			$state.go('main.dashboard');
		});
	}
})(angular);
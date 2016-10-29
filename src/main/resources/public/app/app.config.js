;
(function( angular ) {
	'use strict';
	angular.module('app').config(AppConfig).run(RouterBootstrap);

	AppConfig.$inject = [ '$mdThemingProvider', '$mdIconProvider',
			'$stateProvider', '$urlRouterProvider','$httpProvider' ];

	function AppConfig( $mdThemingProvider, $mdIconProvider, $stateProvider,
			$urlRouterProvider, $httpProvider ) {
		$httpProvider.useApplyAsync(true);
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		
		$mdThemingProvider.theme('default').primaryPalette('blue')
				.accentPalette('red');

		$mdIconProvider
				.iconSet('pendencyType', 'images/icons/pendencyType.svg');
	}

	RouterBootstrap.$inject = [ '$transitions'];

	function RouterBootstrap( $transitions) {
		console.log('bootstrap');		
		$transitions.onSuccess({ to: 'main.**'}, function (trans) {
			var title = trans.$to().data.title;
			var mainService = trans.injector().get('mainService');
			mainService.setTitle(title);
		});
	}
})(angular);
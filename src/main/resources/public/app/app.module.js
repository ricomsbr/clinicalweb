(function(angular) {
	'use strict';
	
	//@formatter:off
	angular.module('app', [
	     'app.main',                  
	     'app.shared',
	     'app.dashboard',
	     'app.requests',
	     'app.requests-to-approval',
	     'app.dayoff',
		 'app.patient',
	     'app.interceptor',
	     'ui.utils.masks'
	]);
	//@formatter:on
})(angular);

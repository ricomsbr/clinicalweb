;
(function (angular) {
	'use strict';
	angular.module('app.main').service('mainService', MainService);
	
	function MainService() {
		this.title = '';
		
		this.setTitle = setTitle;
		
		//////
		
		function setTitle(title) {
			this.title = title;
		}
	}
})(angular);
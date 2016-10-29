;
(function (angular) {
	'use strict'
	angular.module('app.main').component('appMain', {
		templateUrl: 'app/main/main.html',
		controller: MainCtrl,
		bindings: {
			user: '<',
			mainService: '<'
		}
	});
	
	MainCtrl.$inject = ['$mdSidenav', 'userService'];
	
	function MainCtrl($mdSidenav, userService) {
		var self = this;
		
		this.$onInit = onInit;
		this.toggle = toggle;
		this.logout = logout;
		
		//////
		
		function onInit() {}
		
		function toggle() {
			$mdSidenav('left').toggle();
		}
		
		function logout() {
			userService.logout();
		}
	}
	
})(angular);
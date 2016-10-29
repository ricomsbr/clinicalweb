;
(function() {
	'use strict';
	
	angular
		.module('app.main')
		.controller('MainCtrl', MainController);
	
	MainController.$inject = ['$mdSidenav', '$window', 'user', 'userService'];
	
	function MainController($mdSidenav, $window, user, userService) {
		var vm = this;
		vm.toggle = toggle;
		vm.close = close;
		vm.logout = logout;
		
		activate();
		
		////////
		
		function activate() {
			vm.user = user;
		}
		
		function toggle() {
			$mdSidenav('left').toggle();
		}
		
		function close() {
			$mdSidenav('left').close();
		}
		
		function logout() {
			userService.logout();
		}
	}
})();
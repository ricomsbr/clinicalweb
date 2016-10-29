;
(function (angular) {
	'use strict';
	
	angular.module('app.main').component('appSidebar', {
		templateUrl: 'app/main/sidebar.tmpl.html',
		controller: SidebarController
	});
	
	SidebarController.$inject = ['userService'];
	
	function SidebarController(userService) {
		
		this.logout = logout;
		
		function logout() {
			userService.logout();
		}
	}
})(angular);
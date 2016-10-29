;
(function() {
	'use strict';
	
	angular
		.module('app.main')
		.factory('userService', userService);
	
	userService.$inject = ['$http', '$window'];
	
	function userService($http, $window) {
		var user = {};
		var service = {
			getUser: getUser,
			logout : logout
		};
		
		return service;
		
		////////
		
		function getUser() {
			return $http.get('user')
				.then(getUserComplete);
			
			function getUserComplete(response) {
				return response.data;
			}
		}
		
		function logout() {
		  $http.post('/logout').then(redirectToLogin);
		  
		  function redirectToLogin() {
			  $window.location = "/";
		  }
		}
	}
})();
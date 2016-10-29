;
(function() {
	'use strict';
	
	angular
		.module('app.interceptor')
		.factory('interceptorService', interceptorService);
	
	interceptorService.$inject = ['$q', '$window'];
	
	function interceptorService($q, $window) {
		return {
	        'responseError': function(errorResponse) {
	            switch (errorResponse.status) {
		            case 403:
		                $window.location = '#/denied';
		                break;
	            }
	            return $q.reject(errorResponse);
	        }
	    };
	}
})();
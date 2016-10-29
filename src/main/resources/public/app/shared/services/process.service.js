;
(function(angular) {
	'use strict';
	angular.module('app.shared').factory('processService', processService)
			.factory('processAccounts', processAccounts).factory(
					'processCommitments', processCommitments).factory(
					'processCommitmentNSs', processCommitmentNSs);

	processService.$inject = [ '$resource', '$cacheFactory' ];
	processAccounts.$inject = [ '$resource' ];
	processCommitments.$inject = [ '$resource' ];
	processCommitmentNSs.$inject = [ '$resource' ];

	function processService($resource, $cacheFactory) {
		var $httpDefaultCache = $cacheFactory.get('$http');
		var ProcessResource = getProcessResource();
		var service = {
			get : get,
			invalidate : invalidate,
			isActive : isActive
		}

		return service;

		//////// 
		function getProcessResource() {
			return $resource('/resource/processes/:processNumber', {
				processNumber : '@id'
			}, {
				get : {
					method : 'GET',
					cache : true
				}
			});
		}

		function invalidate(key) {
			$httpDefaultCache.remove(key);
		}

		function get(id) {
			return ProcessResource.get({
				processNumber : id
			}).$promise;
		}

		function isActive(process) {
			if (process.validity.start == null
					|| process.validity.start == undefined
					|| process.validity.start == "")
				return false;

			if (process.validity.end == null
					|| process.validity.end == undefined
					|| process.validity.end == "")
				return false;

			var today = new Date();
			var start = new Date(process.validity.start.substring(0, 10));
			start.setDate(start.getDate() + 1);
			var end = new Date(process.validity.end.substring(0, 10));
			end.setDate(end.getDate() + 1);

			if (today < start || today > end)
				return false;
			else
				return true;
		}
	}

	function processAccounts($resource) {
		return $resource('/resource/processes/:processNumber/accounts');
	}

	function processCommitments($resource) {
		return $resource('/resource/processes/:processNumber/commitmentPMs');
	}
	
	function processCommitmentNSs($resource) {
		return $resource('/resource/processes/:processNumber/commitmentNSs');
	}

})(angular);
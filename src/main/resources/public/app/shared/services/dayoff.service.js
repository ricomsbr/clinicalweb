;
(function(angular) {
	'use strict';
	angular.module('app.shared')
	.factory('dayoffService', dayoffService)
	.factory('includeDayoffService', includeDayoffService)
	.factory('excludeDayoffService', excludeDayoffService)
	.factory('excludeDayoffItemService', excludeDayoffItemService)
	.factory('listDayoffService', listDayoffService)
	.factory('editDayoffItemService', editDayoffItemService);

	dayoffService.$inject = ['$resource'];
	includeDayoffService.$inject = ['$resource'];
	excludeDayoffService.$inject = ['$resource'];
	listDayoffService.$inject = ['$resource'];
	excludeDayoffItemService.$inject = ['$resource'];
	editDayoffItemService.$inject = ['$resource'];

	function dayoffService($resource) {
		return $resource('/resource/dayoff/:dayoffMilliseconds', { dayoffMilliseconds : '@dayoffMilliseconds' });
	}
	
	function includeDayoffService($resource) {
		return $resource('/resource/dayoff/include');
	}
	
	function excludeDayoffService($resource) {
		return $resource('/resource/dayoff/exclude');
	}
	
	function excludeDayoffItemService($resource) {
		return $resource('/resource/dayoff/:id/exclude-item', { id : '@id' });
	}
	
	function editDayoffItemService($resource) {
		return $resource('/resource/dayoff/edit-item',null, {'update': {method:'PUT'}});
	}
	
	function listDayoffService($resource) {
		return $resource('/resource/dayoff/period/:begin/:end', { begin : '@begin', end : '@end'});
	}
	
})(angular);
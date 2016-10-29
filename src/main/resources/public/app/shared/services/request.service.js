;
(function(angular) {
	'use strict';
	angular.module('app.shared')
	.factory('requestService', requestService)
	.factory('approveRequestService', approveRequestService)
	.factory('rejectRequestService', rejectRequestService)
	.factory('bgrToSendService', bgrToSendService);

	requestService.$inject = ['$resource'];
	approveRequestService.$inject = ['$resource'];
	rejectRequestService.$inject = ['$resource'];
	bgrToSendService.$inject = ['$resource'];
	
	function requestService($resource) {
		return $resource('/resource/requests/:requestId');
	}
	
	function approveRequestService($resource) {
		return $resource('/resource/requests/:requestId/approvePendency', {requestId:'@requestId'}, {'update': {method:'PUT'}});
	}
	
	function rejectRequestService($resource) {
		return $resource('/resource/requests/:requestId/rejectPendency', {requestId:'@requestId'}, {'update': {method:'PUT'}});
	}
	
	function bgrToSendService($resource) {
		return $resource('/resource/bgr_to_send',null,{'update': {method:'PUT'}});
	}
	
})(angular);
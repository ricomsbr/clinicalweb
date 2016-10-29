;
(function(angular) {
	'use strict';
	angular.module('app.shared')
		.factory('commitmentRequests',commitmentRequests);

	commitmentRequests.$inject = [ '$resource' ];

	function commitmentRequests($resource) {
		return $resource('/resource/commitmentAmounts/:commitmentAmountId/requests');
	}

})(angular);
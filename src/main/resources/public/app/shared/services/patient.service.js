;
(function(angular) {
	'use strict';
	angular.module('app.shared')
	.factory('patientService', patientService);

	patientService.$inject = ['$resource'];
	
	function patientService($resource) {
		return $resource('/resource/patients/:patientId');
	}
	
})(angular);
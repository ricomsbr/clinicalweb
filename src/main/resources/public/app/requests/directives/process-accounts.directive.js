(function(angular) {
	'use strict';
	
	angular
	.module('app.shared')
	.directive('fpProcessAccounts', processAccounts);
	
	function processAccounts($rootScope) {
		return {
			templateUrl: 'app/requests/directives/process-accounts.html',
			controllerAs: 'accountsVm',
			scope: {},
	        bindToController: {
	        	processNumber: '='
	        },
	        controller: ['processAccounts',  
	     			    function (processAccounts) {
	         		var vm = this;
	         		$rootScope.show = true;
		     		vm.showHideDetails = showHideDetails;
	         		vm.accounts = [];
	        		activate();
		        	  
	        		function activate() {
	        			vm.accounts = processAccounts.get({processNumber:vm.processNumber});
	        		}
	        		
	        		function showHideDetails() {
		    			$rootScope.show = !$rootScope.show;
		    		}
	        	}],
		};
	};

})(angular);
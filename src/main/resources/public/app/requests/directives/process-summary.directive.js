(function(angular) {
	'use strict';
	
	angular
	.module('app.shared')
	.directive('fpProcessSummary', processSummary);
	
	function processSummary($rootScope) {
		return {
			templateUrl: 'app/requests/directives/process-summary.html',
			controllerAs: 'summaryVm',
			scope: {},
	        bindToController: {
	        	processNumber: '='
	        },
	        controller: ['processService','processAccounts',
	     			    function (processService,processAccounts) {
	     		var vm = this;
	     		vm.show = true;
	     		vm.showHideDetails = showHideDetails;
	     		vm.process = [];
	     		vm.accounts = [];
	    		activate();
	        	  
	    		function activate() {
					processService.get(vm.processNumber)
					.then(function(results) {
						vm.process = results;
		   			});
					vm.accounts = processAccounts.get({processNumber:vm.processNumber});
	    		}
	    		
	    		function showHideDetails() {
	    			vm.show = !vm.show;
	    			//activate();
	    		}
	    	}]
		};
		
	};

})(angular);


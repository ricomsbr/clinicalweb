(function(angular) {
	'use strict';
	
	angular
	.module('app.shared')
	.directive('fpCommitmentSummary', commitmentSummary);
			
	function commitmentSummary() {
		return {
			restrict: 'E',
	        templateUrl: 'app/requests/directives/commitment-summary.html',
	        controllerAs: 'vm',
	        scope: {},
	        bindToController: {
	        	processNumber: '='
	        },
	        controller: commitmentSummaryController
		}
	        
        commitmentSummaryController.$inject = ['processCommitments', 'requestService', 'commitmentRequests','$mdToast','$document','$rootScope'];
	                     
        function commitmentSummaryController(processCommitments, requestService, commitmentRequests,$mdToast,$document,$rootScope) {
	   		var vm = this;
	   		vm.add = add;
	   		vm.remove = remove;
	   		vm.showHideDetails = showHideDetails;
	   		vm.show = true;
	   		vm.commitments = [];
	   		vm.tabindex = 4;
	   		vm.blockDeleteBtn = false;
	   		
	   		activate();

	   		function activate() {
	   			processCommitments.query({processNumber:vm.processNumber}).$promise
	   			.then(function(results) {
	   				vm.commitments = results;
	   				var i = 0;
	   				for (; i < vm.commitments.length; i++) {
	   					vm.commitments[i].requests = [];
	   					vm.commitments[i].requests = getRequests(vm.commitments[i].commitmentAmountId);
	   				}
	   			});
	   		}

	   		function getRequests(commitmentAmountId) {
	   			return commitmentRequests.get({commitmentAmountId : commitmentAmountId});
	   		}
	   		
	   		function getBlockDeleteButton() {
				return blockDeleteButton.get();
			}
	   		
	   		function add(commitment) {
				var newRequest = {
						id:null,
						requestedValue : {
							amount : commitment.reserveValue,
							currency : {
								code : commitment.estimatedBalance.currency.code,
								symbol : commitment.estimatedBalance.currency.symbol,
								displayName : commitment.estimatedBalance.currency.displayName
							}
						},
						observation : commitment.observation,
					}

				commitmentRequests.save({commitmentAmountId : commitment.commitmentAmountId}, newRequest).$promise
	   			.then(function(results) {
	   				activate();
	   			},function(error) {
	   				var element = $document[0].querySelector('#commitment-commitmentAmountId-'+commitment.commitmentAmountId);
	   				$mdToast.show($mdToast.simple({position : "top right", parent :  element}).content(error.data.message));
	   			});
			}
	   		
			function remove(commitment, request) {
				requestService.remove({requestId : request.id}).$promise
	   			.then(function(results) {
	   				activate();
	   			},function(error) {
	   				var element = $document[0].querySelector('#commitment-commitmentAmountId-'+commitment.commitmentAmountId);
	   				$mdToast.show($mdToast.simple({position : "top right", parent :  element}).content(error.data.message));
	   			});
			}
			
			function showHideDetails() {
    			vm.show = !vm.show;
    		}
			
	   	};
	};

})(angular);

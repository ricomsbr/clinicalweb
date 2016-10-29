(function(angular) {
	'use strict';

	angular.module('app.shared').directive('fpCommitmentSummaryMm',
			commitmentSummary);

	function commitmentSummary() {
		return {
			restrict : 'E',
			templateUrl : 'app/requests/directives/commitment-summary-mm.html',
			controllerAs : 'vm',
			scope : {},
			bindToController : {
				processNumber : '='
			},
			controller : commitmentSummaryController
		}

		commitmentSummaryController.$inject = [ 'processCommitmentNSs',
				'requestService', 'commitmentRequests', '$scope', '$mdToast',
				'$document' ];

		function commitmentSummaryController(processCommitmentNSs,
				requestService, commitmentRequests, $scope, $mdToast, $document) {
			var vm = this;
			vm.add = add;
			vm.remove = remove;
			vm.commitments = [];
			vm.quotes = [];
			vm.tabindex = 4;
			vm.show = true;
			vm.showHideDetails = showHideDetails;
			vm.blockDeleteBtn = false;
			activate();

			function activate() {
				processCommitmentNSs.query({
					processNumber : vm.processNumber
				}).$promise
						.then(function(results) {
							var i;
							vm.commitments = results;
							if (vm.commitments[0]) {
								for (i = 0; i < vm.commitments[0].amounts.length; i++) {
									vm.commitments[0].amounts[i].requests = [];
									vm.commitments[0].amounts[i].requests = getRequests(vm.commitments[0].amounts[i].id);

									vm.quotes[i] = vm.commitments[0].amounts[i].estimatedBalance.amount;
									vm.commitments[0].amounts[i].showForm = false;

									if (vm.quotes[i] > 0)
										vm.commitments[0].amounts[i].showForm = true;
								}
							}
						});
			}

			function getRequests(commitmentAmountId) {
				return commitmentRequests.query({
					commitmentAmountId : commitmentAmountId
				});
			}

			function getBlockDeleteButton() {
				return blockDeleteButton.get();
			}

			function add(amount) {
				var newRequest = {
					id : null,
					requestedValue : {
						amount : amount.estimatedBalance.amount,
						currency : {
							code : amount.estimatedBalance.currency.code,
							symbol : amount.estimatedBalance.currency.symbol,
							displayName : amount.estimatedBalance.currency.displayName
						}
					},
					observation : amount.observation,
				}

				commitmentRequests.save({
					commitmentAmountId : amount.id
				}, newRequest).$promise.then(function(results) {
					activate();
				}, function(error) {
					var element = $document[0]
							.querySelector('#commitment-commitmentAmountId-'
									+ vm.commitments[0].amounts[0].id);
					$mdToast.show($mdToast.simple({
						position : "top right",
						parent : element
					}).content(error.data.message));
				});
			}

			function remove(commitment,request) {
				requestService.remove({
					requestId : request.id
				}).$promise.then(function(results) {
					activate();
				},function(error) {
	   				var element = $document[0].querySelector('#commitment-commitmentAmountId-'+commitment.amounts[0].id);
	   				$mdToast.show($mdToast.simple({position : "top right", parent :  element}).content(error.data.message));
	   			});
			}
			
			function showHideDetails() {
    			vm.show = !vm.show;
    		}


		}
		;
	}
	;

})(angular);

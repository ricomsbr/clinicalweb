(function(angular) {
	'use strict';

	angular.module('app.shared').directive('fpSubmitRequests', submitRequests);

	function submitRequests() {
		return {
			restrict : 'E',
			templateUrl : 'app/requests/directives/submit-requests.html',
			controllerAs : 'vm',
			scope : {},
			bindToController : {
				processNumber : '='
			},
			controller : submitRequestsController
		}

		submitRequestsController.$inject = [ 'requestService', '$mdToast',
				'$document', 'approveRequestService', 'rejectRequestService',
				'$mdDialog', 'bgrToSendService', '$rootScope' ];

		function submitRequestsController(requestService, $mdToast, $document,
				$mdDialog, bgrToSendService, $rootScope) {

			var vm = this;
			vm.showRequestDetails = showRequestDetails;
			vm.showRemoveDialog = showRemoveDialog;
			vm.showSubmitDialog = showSubmitDialog;
//			$rootScope.pageName = "Enviar Solicitações ao DAP";
			activate();

			function activate() {
				bgrToSendService.get().$promise.then(function(results) {
					vm.requests = results;
				});
			}

			function showRequestDetails(event, request) {
				$mdDialog.show({
					controller : requestDetailsDialogController,
					controllerAs : 'dc',
					locals : {
						request : request
					},
					templateUrl : 'app/dialog/request-details.dialog.html',
					parent : angular.element(document.body),
					targetEvent : event,
					clickOutsideToClose : true
				}).then(function(response) {
					if (response) {
						showMessage(response.message);
					} else {
						showMessage(response.data.message);
					}
				});

				function requestDetailsDialogController($mdDialog, request) {
					var vm = this;
					vm.cancel = cancel;
					vm.request = request;

					function cancel() {
						$mdDialog.cancel();
					}
				}
			}

			function showRemoveDialog(event, request) {
				$mdDialog.show({
					controller : removeDialogController,
					controllerAs : 'dc',
					locals : {
						request : request
					},
					templateUrl : 'app/dialog/remove-request.dialog.html',
					parent : angular.element(document.body),
					targetEvent : event,
					clickOutsideToClose : true
				}).then(function(response) {
					if (response) {
						showMessage(response);
					} else {
						showMessage(response.data.message);
					}
					activate();
				});

				function removeDialogController($mdDialog, request,
						requestService) {
					var vm = this;
					vm.cancel = cancel;
					vm.remove = remove;

					function remove(event) {
						var promise = requestService.remove({
							requestId : request.id
						}).$promise;
						promise
								.then(
										function(response) {
											$mdDialog
													.hide("Item excluído com sucesso");
										},
										function(reason) {
											$mdDialog
													.hide("Ocorreu um erro durante a exclusão!");
										});
					}
					function cancel() {
						$mdDialog.cancel();
					}
				}
			}

			function showSubmitDialog(event) {
				$mdDialog.show({
					controller : submitDialogController,
					controllerAs : 'dc',
					locals : {
						requests : vm.requests
					},
					templateUrl : 'app/dialog/submit-requests.dialog.html',
					parent : angular.element(document.body),
					targetEvent : event,
					clickOutsideToClose : true
				}).then(function(response) {
					if (response) {
						showMessage(response);
					} else {
						showMessage(response.data.message);
					}
					activate();
				});

				function submitDialogController($mdDialog, requests,
						bgrToSendService) {
					var vm = this;
					vm.cancel = cancel;
					vm.requests = requests;
					vm.submit = submit;
					vm.loading = false;

					function submit(event) {
						vm.loading = true;
						var toSendBgrsTO = {};
						var bgrVersionMap = {};
						if (vm.requests.bgrs != undefined) {
							for (var i = 0; i < vm.requests.bgrs.length; i++) {
								if (vm.requests.bgrs[i].version == undefined)
									bgrVersionMap[vm.requests.bgrs[i].id] = 0;
								else
									bgrVersionMap[vm.requests.bgrs[i].id] = vm.requests.bgrs[i].version;
							}
						}
						toSendBgrsTO.bgrVersionMap = bgrVersionMap;

						var promise = bgrToSendService.update(toSendBgrsTO).$promise;
						promise
								.then(
										function(response) {
											$mdDialog
													.hide("Solicitações submetidas com sucesso.");
											vm.loading = false;
										},
										function(reason) {
											$mdDialog
													.hide("Erro ao submeter as solicitações.");
											vm.loading = false;
										});
					}

					function cancel() {
						$mdDialog.cancel();
					}

				}
			}

			function showMessage(message) {
				$mdToast.show($mdToast.simple({
					position : "top right",
					parent : vm.cardElement
				}).content(message));
			}

		}
		;
	}
	;

})(angular);

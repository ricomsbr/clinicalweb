;
(function(angular) {
	'use strict';
	angular
		.module('app.requests-to-approval')
		.controller('RequestsToApprovalController', RequestsToApprovalController);
	
	RequestsToApprovalController.$inject = ['$mdDialog','$mdToast','requestService', '$document', '$rootScope'];
	
	function RequestsToApprovalController($mdDialog, $mdToast, requestService, $document, $rootScope) {
		
		var vm = this;
		vm.cardElement = $document[0].querySelector('#to-approval-id');
		vm.show_approve = show_approve;
		vm.show_reject = show_reject;
		vm.goToRequest = goToRequest;
		vm.requestList = [];
//		$rootScope.pageName = "Solicitações Pendentes";
		
		var promise = requestService.query({hasPendencies:true}).$promise;
		promise.then(function(requestList) {
			for(var i = 0; i<requestList.length; i++){
				if(requestList[i].currentState.enum == "WAITING_APPROVAL" || "WAITING_PROCESS")
					vm.requestList.push(requestList[i]);
			}
		});
		
		function goToRequest (event, request) {
			
			$mdDialog.show({
				controller: DialogController,
				controllerAs: 'dc',
				locals: {
					request: request
			    },
				templateUrl: 'app/dialog/requests-to-approval-info.dialog.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose:true
			}).then(function(response) {
				if(response.message) {
					showMessage(response.message);
				} else {
					showMessage(response.data.message);
				} 
				if(response.bgr && response.bgr.currentState) {
					request.currentState = response.bgr.currentState;
				}
			});
		}
				
		function show_approve (event, request) {
			
			$mdDialog.show({
				controller: DialogController,
				controllerAs: 'dc',
				locals: {
					request: request
			    },
				templateUrl: 'app/dialog/requests-to-approval-approve.dialog.html',
				parent: angular.element(document.body),
				targetEvent: event
			}).then(function(response) {
				if(response.message) {
					showMessage(response.message);
				} else {
					showMessage(response.data.message);
				} 
				if(response.bgr && response.bgr.currentState) {
					request.currentState = response.bgr.currentState;
				}
			});
		}
		
		function show_reject (event, request) {
			
			$mdDialog.show({
				controller: DialogController,
				controllerAs: 'dc',
				locals: {
					request: request
			    },
				templateUrl: 'app/dialog/requests-to-approval-reject.dialog.html',
				parent: angular.element(document.body),
				targetEvent: event
			}).then(function(response) {
				if(response.message) {
					showMessage(response.message);
				} else {
					showMessage(response.data.message);
				} 
				if(response.bgr && response.bgr.currentState) {
					request.currentState = response.bgr.currentState;
				}
			});
		}
				
		function showMessage(message) {
			$mdToast.show($mdToast.simple({position : "top right", parent :  vm.cardElement}).content(message));
		}
	}
	
	function DialogController($mdDialog, request, approveRequestService, rejectRequestService) {
		var vm = this;
		vm.approve = approve;
		vm.reject = reject;
		vm.cancel = cancel;
		vm.request = request;
		
		function approve (event) {
			console.log('approving');
			
			var promise = approveRequestService.update({requestId:request.id,requestedValue:request.requestedValue}).$promise;
			
			promise.then(function(response) {
				$mdDialog.hide(response);
			}, function(reason) {
				$mdDialog.hide(reason);
			});
		}
		
		function reject (event) {
			console.log('rejecting');
			
			var promise = rejectRequestService.update({requestId:request.id,requestedValue:request.requestedValue}).$promise;
			
			promise.then(function(response) {
				$mdDialog.hide(response);
			}, function(reason) {
				$mdDialog.hide(reason);
			});
		}
		
		function cancel () {
		    $mdDialog.cancel();
		};
	}
})(angular);
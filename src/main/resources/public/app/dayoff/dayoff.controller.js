;
(function(angular) {
	'use strict';
	angular
		.module('app.dayoff')
		.controller('DayoffController', DayoffController);
	
	DayoffController.$inject = ['$http','dayoffService','includeDayoffService','excludeDayoffService','excludeDayoffItemService','editDayoffItemService','listDayoffService','$document','$mdToast','$rootScope'];
	
	function DayoffController($http, dayoffService,includeDayoffService,excludeDayoffService,excludeDayoffItemService,editDayoffItemService,listDayoffService,$document,$mdToast,$rootScope) {
		
		var vm = this;
		vm.cardElement = $document[0].querySelector('#dayoff-id');
		vm.myDate1 = new Date();
		vm.myDate2 = new Date();
		vm.description = null;
		vm.listDayOff = null;
		
		vm.option = 1;
		vm.optionPeriod = 1;
		vm.change = change;
		vm.include = include;
		vm.exclude = exclude;
		vm.edit = edit;
		vm.editSave = editSave;
		vm.editCancel = editCancel;
		vm.excludeItem = excludeItem;
				
		updateDayoff();
		updateDayoffList();
//		$rootScope.pageName = "Incluir/Excluir Feriado(s)"
		
		function updateDayoff() {
			var promise = dayoffService.get({dayoffMilliseconds:vm.myDate1.getTime()}).$promise;
			promise.then(function(result) {
				vm.dayoff = result.isDayoff;
				vm.description = result.description;
			});
		}
		
		function updateDayoffList() {
			var period = getPeriod();
			var listDayOffpromise = listDayoffService.query({begin:period.begin,end:period.end}).$promise;
			listDayOffpromise.then(function(result) {
				vm.listDayOff = result;
			});
		}
		
		function change () {
			
			if(vm.option == 1) {
				updateDayoff();
			} else {
				vm.description = null;
			}
			if(vm.myDate1 > vm.myDate2 || vm.option ==1) {
				vm.myDate2 = vm.myDate1;
			}
			updateDayoffList();
		}
		
		function edit(item) {
			item.edit = true;
		}
		
		function editCancel(item) {
			item.edit = false;
		}
		
		function editSave(item) {
			var promiseEdit = editDayoffItemService.update({id:item.id,description:item.description}).$promise;
			
			promiseEdit.then(function(response) {
				updateDayoffList();
				showMessage(response.msg);
				
				if(vm.option == 1){
					updateDayoff();
				}
			}, function(reason) {
				if(reason.data.message) {
					showMessage(reason.data.message);
				}
			});
		}
		
		function include() {
			
			var params = getParams();
			var promiseInclude = includeDayoffService.save(params).$promise;
			
			promiseInclude.then(function(response) {
				updateDayoffList();
				showMessage(response.msg);
				vm.dayoff = response.isDayoff;
				if(vm.option == 1) {
					vm.description = response.description;
				}
			}, function(reason) {
				if(reason.data.message) {
					showMessage(reason.data.message);
				}
			});
		}
		
		function excludeItem(item) {
			
			var promiseExcludeItem = excludeDayoffItemService.remove({id:item.id}).$promise;
			
			promiseExcludeItem.then(function(response) {
				updateDayoffList();
				showMessage(response.msg);
				
				if(vm.option == 1){
					updateDayoff();
				}
				
			}, function(reason) {
				if(reason.data.message) {
					showMessage(reason.data.message);
				}
			});
		}
		
		function exclude() {
			
			var params = getParams();
			var promiseExclude = excludeDayoffService.save(params).$promise;
			
			promiseExclude.then(function(response) {
				updateDayoffList();
				showMessage(response.msg);
				vm.dayoff = response.isDayoff;
				vm.description = null;
			}, function(reason) {
				if(reason.data.message) {
					showMessage(reason.data.message);
				}
			});
		}
		
		function getPeriod () {
			
			var period = new Object();
			var monthBegin = vm.myDate1.getMonth() + 1;
			monthBegin = ("0" + monthBegin).slice(-2);
			period.begin = vm.myDate1.getFullYear() + "-" + monthBegin;
			
			if(vm.option == 1) {
				period.end = period.begin;
			} else {
				var monthEnd = vm.myDate2.getMonth() + 1;
				monthEnd = ("0" + monthEnd).slice(-2);
				period.end = vm.myDate2.getFullYear() + "-" + monthEnd;
			}
			return period;
		}
		
		function getParams() {
			var params = {};
			var startDate = new Date(vm.myDate1.getFullYear(),vm.myDate1.getMonth(),vm.myDate1.getDate(),0,0,0,0);
			var endDate = new Date(vm.myDate2.getFullYear(),vm.myDate2.getMonth(),vm.myDate2.getDate(),0,0,0,0);
			var description = vm.description;
			
			if(vm.option == 1) {
				params = {startDate:startDate.getTime(), endDate: startDate.getTime(),description:description};
			} else if (vm.option == 2) {
				params = {startDate:startDate.getTime(), endDate: endDate.getTime(),description:description};
			}
			return params;
		}
		
		function showMessage(message) {
			$mdToast.show($mdToast.simple({position : "top right", parent :  vm.cardElement}).content(message));
		}

	}
	
})(angular);
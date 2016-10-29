;
(function(angular) {
	'use strict';
	
	angular
		.module('app.shared')
		.directive('fpDecimalMask', decimalMask);
	
	decimalMask.$inject = ['$filter', '$parse'];
	
	function decimalMask($filter, $parse) {
		var directive = {
			require: 'ngModel',
			restrict: 'A',
			scope : {
	            max : '=',
	        },
			link: link
		};
		
		return directive;
				
		////////
		function link(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(parseFormat);
            ngModel.$parsers.push(parseMaxLength);
            ngModel.$validators.max = max;
            ngModel.$validators.min = min;
            ngModel.$render = renderX;
                        
            var params = scope.$eval(attrs.fpDecimalMask)
            var first_error_value;
            var MAX_LENGTH = 15;
            var MAX_VALUE = 1e13;
            var MIN_VALUE = -1e13;
            
            function renderX() {
            	parseFormat(ngModel.$viewValue);
            }
            
            function parseFormat(viewValue) {
    			var value = viewValue +  "";
    			var negativePrefix = value.match(/[-]/);
    			negativePrefix = (negativePrefix == null ? "" : negativePrefix); 
    			value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
    			value = value.replace(/^(\d{1})$/, "0$1"); 
    			value = value.replace(/(\d{2})$/, ".$1"); // Coloca o ponto

    			var decimalValue = negativePrefix + $filter('number', 'fractionSize')(parseFloat(value), 2);
    			element.val(decimalValue);
    			if (decimalValue != viewValue) {
    				ngModel.$setViewValue(decimalValue);
            	}

    			return negativePrefix + value;
            }
            
            function parseMaxLength(viewValue) {
            	var result;
            	result = viewValue;
    			var number = viewValue.replace(/\D/g, ""); // Remove tudo o que não é dígito

            	if (number.length < MAX_LENGTH) {
            		first_error_value = undefined;
            	} else {
            		if (first_error_value == undefined) {
            			first_error_value = viewValue;
            		} 
            		if (first_error_value != viewValue) {
                   		ngModel.$setViewValue(first_error_value);
            		}
            	}
            	return result;
            }

            function min(modelValue, viewValue) {
            	if ((params != undefined && params.min != undefined && modelValue < params.min) || modelValue < MIN_VALUE) {
            		return false;
            	}
            	return true;
            }
            
            function max(modelValue, viewValue) {
               	if ((params != undefined && params.max != undefined && modelValue > params.max) || modelValue > MAX_VALUE) {
            		return false;
            	}
            	return true;
            }
            
		}
	}
	
})(angular);
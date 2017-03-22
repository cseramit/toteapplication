punterApp.directive('toteNumber',['$filter', function($filter) {
    'use strict';
    var addCommasToInteger;
    var NUMBER_REGEXP      = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
    var NUMBER_REGEXP_MAX8_WITHDECIMAL = /^\s*(\-|\+)?\d{0,7}(\d\.\d?|\.\d)?\d?\s*$/;
    var NUMBER_REGEXP_MAX8_WITHOUTDECIMAL = /^\s*(\-|\+)?\d{1,8}\s*$/;
    var NUMBER_REGEXP_MAX2_WITHOUTDECIMAL = /^\s*(\-|\+)?\d{1,2}\s*$/;
    var ALPHA_REGEXP = /^\s*(\-|\+)?(P|W|p|w)\s*$/;


    addCommasToInteger = function(val) {
        var parts = val.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    function link(scope, el, attrs, ngModelCtrl) {
        var min, max, lastValidValue, changetothousand, addcomma;

        /**
         * Returns a rounded number in the precision setup by the directive
         * @param  {Number} num Number to be rounded
         * @return {Number}     Rounded number
         */

        function getPrecisionValue() {

            if(attrs.max8chracters === 'true') {
                return 2;
            }

            if(attrs.max8chracterswithoutdecimal === 'true') {
                return 0;
            }

            var precistionAttr = attrs.precision;
            var parsed = parseFloat(precistionAttr);
            var precisionVal = !isNaN(parsed) ? parsed : -1;

            return precisionVal;
        }

        function round(num) {

            var pValue = getPrecisionValue();

            if(pValue === -1)
                return num;

            var d = Math.pow(10, pValue);
            return Math.round(num * d) / d;
        }

        /**
         * Returns a string that represents the rounded number
         * @param  {Number} value Number to be rounded
         * @return {String}       The string representation
         */
        function formatPrecision(value) {

            var pValue = getPrecisionValue();

            if(pValue === -1)
                return value;

            return parseFloat(value).toFixed(pValue);
        }

        function formatToThousand(value) {

            var tkey = attrs.toteNumberChangeToThousand;

            if(tkey) {
                if ((typeof tkey === 'string' && (tkey.toLowerCase() === 'true' || tkey.toLowerCase() === 'yes')) || tkey === 1)
                    changetothousand = true;
                else
                    changetothousand = false;
            } else {
                changetothousand = false;
            }

            if(changetothousand) {
                return Math.round(value / 1000) * 1000;
            }
            else {
                return value;
            }
        }

        function formatViewValue(value) {

            if(value == 0) //Zero is a valid value
                return '' + (value);

            return !value ? '' : '' + (value);
        }

        function minValidator(value) {

            //console.log('minValidator:' + value);
            if(value == null || value == undefined || value=='') {
                ngModelCtrl.$setValidity('min', true);
                return value;
            }

            var valueIn = parseFloat(formatViewValue(value).replace(/,/g, ''));

            //console.log('valueIn:' + valueIn + 'min:' + min);

            if (valueIn < min) {

                //console.log('ngModelCtrl.$setValidity(min, false)');

                ngModelCtrl.$setValidity('min', false);
                return undefined;
                //return value;
            } else {
                ngModelCtrl.$setValidity('min', true);
                return value;
            }
        }

        function maxValidator(value) {

            if(value == null || value == undefined || value=='') {
                ngModelCtrl.$setValidity('max', true);
                return value;
            }

            var valueIn = parseFloat(formatViewValue(value).replace(/,/g, ''));

            if (valueIn > max) {
                ngModelCtrl.$setValidity('max', false);
                return undefined;
                //return value;
            } else {
                ngModelCtrl.$setValidity('max', true);
                return value;
            }
        }

        ngModelCtrl.$parsers.push(function(value) {
            if (angular.isUndefined(value) || String(value) == "NaN") {
                value = '';
            }

            // Handle leading decimal point, like ".5"
            if (value.indexOf('.') === 0) {
                value = '0' + value;
            }

            // Allow "-" inputs only when min < 0
            if (value.indexOf('-') === 0) {
                if (min >= 0) {
                    //value = null;
                    value = value.replace(/-/g, '');
                    ngModelCtrl.$setViewValue(value);
                    ngModelCtrl.$render();
                } else if (value === '-') {
                    value = '';
                }
            }

            var CHECK_FINAL_NUMBER_EXPRESSION = '';
            if(attrs.max8chracters === 'true') {
                CHECK_FINAL_NUMBER_EXPRESSION = NUMBER_REGEXP_MAX8_WITHDECIMAL;
            }
            else if(attrs.max8chracterswithoutdecimal === 'true') {
                CHECK_FINAL_NUMBER_EXPRESSION = NUMBER_REGEXP_MAX8_WITHOUTDECIMAL;
            }
            else if (attrs.max2chracterswithoutdecimal === 'true' ) {
                CHECK_FINAL_NUMBER_EXPRESSION = NUMBER_REGEXP_MAX2_WITHOUTDECIMAL;
            }else if(attrs.letters === 'true') {
                CHECK_FINAL_NUMBER_EXPRESSION = ALPHA_REGEXP;
            }
            else {
                CHECK_FINAL_NUMBER_EXPRESSION = NUMBER_REGEXP;
            }

            //var empty = ngModelCtrl.$isEmpty(value);
            if (!value || CHECK_FINAL_NUMBER_EXPRESSION.test(value)) {
                if( (CHECK_FINAL_NUMBER_EXPRESSION != ALPHA_REGEXP) && (CHECK_FINAL_NUMBER_EXPRESSION != NUMBER_REGEXP))
                {
                    lastValidValue = (value === '') ? null : (!value ? value : parseFloat(value));
                }else {
                    lastValidValue = (value === '') ? null : (!value ? value : value);
                }
            } else {
                // Render the last valid input in the field
                ngModelCtrl.$setViewValue(formatViewValue(lastValidValue));
                ngModelCtrl.$render();
            }

            ngModelCtrl.$setValidity('number', true);

            return lastValidValue;
        });
        ngModelCtrl.$formatters.push(formatViewValue);


        // Min validation
        if (angular.isDefined(attrs.min)) {
            attrs.$observe('min', function(value) {
                min = parseFloat(value || 0);
                minValidator(ngModelCtrl.$modelValue);
            });

            ngModelCtrl.$parsers.push(minValidator);
            ngModelCtrl.$formatters.push(minValidator);
        }


        // Max validation (optional)
        if (angular.isDefined(attrs.max)) {
            attrs.$observe('max', function(val) {
                max = parseFloat(val);
                maxValidator(ngModelCtrl.$modelValue);
            });

            ngModelCtrl.$parsers.push(maxValidator);
            ngModelCtrl.$formatters.push(maxValidator);
        }

        ngModelCtrl.$formatters.push(function(val) {

            if (((val == null) || !val) && val != 0) {
                return val;
            }
            ngModelCtrl.$setValidity('number', true);

            val = formatToThousand(val);

            val = formatPrecision(val);

            ngModelCtrl.$setViewValue(formatViewValue(val));
            ngModelCtrl.$render();


            var tkey = attrs.toteNumberAddComma;

            if(tkey) {
                if ((typeof tkey === 'string' && (tkey.toLowerCase() === 'true' || tkey.toLowerCase() === 'yes')) || tkey === 1)
                    addcomma = true;
                else
                    addcomma = false;
            } else {
                addcomma = false;
            }

            if(addcomma) {
                val = addCommasToInteger(val.toString());
            }

            return val;
        });

        ngModelCtrl.$parsers.push(function(value) {
            if (value || value == 0) {
                // Save with rounded value
                value = formatToThousand(value);

                value = round(value);

                return value;
            } else {
                return undefined;
            }
        });

        // Auto-format precision on blur
        el.on('blur', function() {
            var formatter, viewValue, _i, _len, _ref;
            viewValue = ngModelCtrl.$modelValue;

            if(viewValue == null && attrs.defaulttozero === 'true') {
                viewValue = "0";
            }

            if (viewValue == null) {
                return;
            }

            _ref = ngModelCtrl.$formatters;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                formatter = _ref[_i];
                viewValue = formatter(viewValue);
            }
            ngModelCtrl.$viewValue = viewValue;
            return ngModelCtrl.$render();
        });

        el.on('focus', function() {
            var val;
            val = el.val();
            el.val(val.replace(/,/g, ''));

            //if(el.val() == 0) {
            //    el.val('');
            //}

            return el[0].select();
        });
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };
}]);
'use strict';

/* Filters */

// angular.module('myApp.filters', []).

//   filter('interpolate', ['version', function(version) {
//     return function(text) {
//       return String(text).replace(/\%VERSION\%/mg, version);
//     }.
//     filter('colorItem', function() { 
//         return function() {
//             out = "FILTER";
//             return out;
//         }
//     }).
//     filter('getById', function() {
//     	return function(input, id) {
//     		var i=0, len=input.length;
//     		for (; i<len; i++) {
//     			if (+input[i].id == +id) {
//     				return input[i];
//     			}
//     		}
//     		return null;
//     	}
// 		})
//   }]);


angular.module('myApp.filters', []).
    filter('colorItem', function() { 
        return function(input) {
            var out;
            if(input=="On the run"){
                out = "rgba(155, 89, 182,1.0)";
            }
            else if(input=="On demand"){
                out = "rgba(230, 126, 34,1.0)";
            }
            else if(input == "Groceries"){
                out = "rgba(22, 160, 133,1.0)";
            }
            return out;
        }
    });
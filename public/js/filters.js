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


angular.module('myApp.filters', [])
    .filter('orderObjectBy', function() {
      return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
          filtered.push(item);
        });
        filtered.sort(function (a, b) {
          return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
      };
    })
    // calcul du total du panier
    .filter('cartTotal', function() {
        return function(input) {
            var total = 0;
            for (var i = input.length - 1; i >= 0; i--) {
                total+= input[i].prix*input[i].qty;
            };
            return total;
        };
    })
    // colorise les items en fonction du type
    .filter('colorItem', function() { 
        return function(input) {
            var out;
            if(input=="On the run"){
                out = "rgba(230, 126, 34,1.0)";
            }
            else if(input=="On demand"){
                
                out = "rgba(137, 196, 244,1.0)";
            }
            else if(input == "Groceries"){
                
                out = "rgba(102, 204, 153,1.0)";
            }
            return out;
        }
    });
(function() {
  'use strict';

  angular
    .module('search-box', [
        'ui.bootstrap'
    ])
    .directive('searchBox', searchBoxDirective);

  ////////////////
  // DIRECTIVES //
  ////////////////

  /**
   * search-box directive
   * @return {void}
   */
  function searchBoxDirective() {
      return {
        templateUrl: 'search-box/search-box.tpl.html',
        replace: true,
        require: 'ngModel',
        restrict: 'EA',
        controller: 'SearchBoxController',
        scope: {
          ngModel: '='
        },
        link: function linkFunction(scope, element, attrs, ngModel) {
          scope.$watch('ngModel', function(newValue) {
            console.log('input value', newValue);
          });
        }
      };
    }
})();
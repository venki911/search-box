(function() {
  'use strict';

  angular
    .module('search-box', [
        'ui.bootstrap',
        'ngAnimate',
    ])
    .directive('searchBox', searchBoxDirective);

  searchBoxDirective.$inject = ['SearchService'];
  /**
   * search-box directive
   * @return {void}
   * @author Marco Ávila <marcotulio.avila@gmail.com>
   */
  function searchBoxDirective(SearchService) {
    return {
      templateUrl: 'search-box/search-box.tpl.html',
      replace: true,
      restrict: 'E',
      controller: 'SearchBoxController as vm',
      scope: {},
      link: linkFunction
    };

    /**
     * Angular link function
     * @param  {Object}              scope   Isolated Scope
     * @param  {Object}              element DOM Element
     * @param  {Array}               attrs   DOM Attributes
     * @param  {SearchBoxController} vm      The search box controller
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     * @return {void}
     */
    function linkFunction(scope, element, attrs, vm) {
      scope.$watch('vm.query', function(newQuery, oldQuery) {
        console.log('changed value', newQuery, oldQuery);
        if (newQuery !== undefined) {
          if (newQuery === '' || newQuery === scope.vm.queries[0]) {
            return scope.vm.queries = [];
          }
          vm.hideSuggestions = false;
        }
        if (newQuery !== oldQuery) {
          vm.updateSuggestions(newQuery);
        }
      });
    }
  }
})();
(function() {
  'use strict';

  angular
    .module('search-box')
    .controller('SearchBoxController', SearchBoxController);

  SearchBoxController.$inject = ['SearchService', '$scope'];

  /**
   * Controller for search-box directive
   * @param {Object} SearchService Service
   * @author Marco Ávila <marcotulio.avila@gmail.com>
   */
  function SearchBoxController(SearchService, $scope) {
    var vm = this;
    vm.query             = '';
    vm.queries           = [];
    vm.updateSuggestions = updateSuggestions;
    vm.search            = search;
    vm.selectQuery       = selectQuery;
    vm.hideSuggestions   = true;

    //////////////////

    /**
     * Updates the list of guessed queries
     * @param  {string} text From user
     * @return {void}
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function updateSuggestions(text) {
      SearchService.getSuggestions(text).then(function(response) {
        vm.queries = response.data;
      });
    }

    /**
     * Submit a query search
     * @param  {string} query From user
     * @return {void}
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function search(query) {
      return SearchService.search(query);
    }

    /**
     * Choose suggestion and search the selected query
     * @param  {string} query Selected
     * @return {void}
     */
    function selectQuery(query) {
      vm.query = query.text;
      vm.queries = [];
      vm.search(vm.query);
      $scope.$digest();
      vm.hideSuggestions;
    }
  }
})();
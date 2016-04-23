(function() {
  'use strict';

  angular
    .module('search-box')
    .service('SearchService', SearchService);

  SearchService.$inject = ['$http'];
  /**
   * Search service for API communication
   * @param {Object} $http Service
   * @author Marco Ávila <marcotulio.avila@gmail.com>
   */
  function SearchService($http) {
    var self = this;
    self.search         = search;
    self.getSuggestions = getSuggestions;
    self.reset          = reset;
    self.destroyAll     = destroyAll;
    self.getQueries     = getQueries;
    self.queries        = [];

    return self;

    /**
     * Submit a search query to api
     * @param  {string} text Input from user
     * @return {Object}      Promise
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function search(text) {
      console.log('searching text', text);
      return $http.post('/api/query', {query: text});
    }

    /**
     * Returns a suggestion list of what user is trying to search
     * @param  {string} text Input from user
     * @return {Object}      Promise
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function getSuggestions(text) {
      console.log('guessing query', text);
      return $http.post('/api/query/suggestions', {query: text});
    }

    /**
     * Returns all query searches
     * @return {Object} Promise
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function getQueries() {
      return $http.get('/api/query');
    }

    /**
     * Resets the counter of all search queries
     * @return {Object} Promise
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function reset() {
      console.log('reseting counter of all searches');
      return $http.delete('/api/query');
    }

    /**
     * Destroys all queries from database
     * @return {Object} Promise
     */
    function destroyAll() {
      console.log('Destroing all queries');
      return $http.delete('/api/query/all');
    }
  }
})();
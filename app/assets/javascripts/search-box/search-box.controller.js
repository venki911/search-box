(function() {
  'use strict';

  angular
    .module('search-box')
    .controller('SearchBoxController', SearchBoxController);

  SearchBoxController.$inject = ['$http'];
  /**
   * Controller for search-box directive
   * @param {Object} $http Service
   */
  function SearchBoxController($http) {
    console.log('controler');
  }
})();
(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SearchService', '$interval'];
  /**
   * Home controller to manipulate the watcher of queries
   * @param {Object} SearchService Service
   * @param {Object} $interval     Service
   * @author Marco Ávila <marcotulio.avila@gmail.com>
   */
  function HomeController(SearchService, $interval) {
    var vm = this;
    vm.searches     = [];
    vm.reset        = SearchService.reset;
    vm.startWatcher = startWatcher;
    vm.stopWatcher  = stopWatcher;
    vm.running      = false;

    var watcher,
      interval = 1000;

    startWatcher();

    ////////////////

    /**
     * Initialize the queries watcher
     * @return {void}
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function startWatcher() {
      if (angular.isUndefined(watcher)) {
        watcher = $interval(function() {
          SearchService.getQueries().then(function(response) {
            vm.searches = response.data;
          });
        }, interval);
        vm.running = true;
      }
    }

    /**
     * Stops the queries watcher
     * @return {void}
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function stopWatcher() {
      if (angular.isDefined(watcher)) {
        $interval.cancel(watcher);
        watcher = undefined;
        vm.running = false;
      }
    }
  }
})();
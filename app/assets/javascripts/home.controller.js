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
    vm.destroyAll   = SearchService.destroyAll;
    vm.running      = false;

    activate();

    ////////////////

    /**
     * Establish websocket connection and bind events to vm.queries
     *
     * @return {void}
     * @author Marco Tulio de Avila Santos <marco.santos@aker.com.br>
     */
    function startWebsocket() {
      var socket = new WebSocketRails(window.location.host + "/websocket");

      socket.on_open = function(data) {
        console.log('Connection established', data);
      }
      socket.bind('connection_closed', function(data) {
        console.log('Connection closed', data);
      });
      socket.bind('connection_error', function(data) {
        console.log('Connection error', data);
      });

      var channel = socket.subscribe('query');

      channel.bind('all_searches', function(data) {
        vm.searches = data;
      });
    }

    /**
     * Initialize the queries watcher
     * @return {void}
     * @author Marco Ávila <marcotulio.avila@gmail.com>
     */
    function activate() {
      startWebsocket();
      SearchService.getQueries().then(function(response) {
        vm.searches = response.data;
      });
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

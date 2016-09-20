// public/js/core.js
(function(angular){
    'use strict';

    var adsMonitor = angular.module('adsMonitor', []);

    adsMonitor.controller('mpController',function ($scope, $http) {
        $scope.formData = {
            keywords : 'cruiser',
            category: '30',
            location : '80002',
            minPrice: '0',
            maxPrice: '10000'
        };
        $scope.server_run = false;
        $scope.logs = [];

        $scope.serverStatus = function () {
            if($scope.server_run){
                console.log('start server loop');
                $scope.server_run = setTimeout(function(){
                    // get current server status
                    $http.get('/api/scanner/status')
                        .success(function(data) {
                            $scope.logs = [];
                            $scope.scanner = data;
                            $scope.logs = $scope.scanner.log;
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                            clearTimeout($scope.server_run);
                            $scope.server_run = false;
                        });
                    $scope.serverStatus();
                }, 5000);
            }
        };

        // on submit start the server
        $scope.startServer = function() {
            console.log('start server');
            $http.post('/api/scanner/start', $scope.formData)
                .success(function(data) {
                    $scope.server_run = true;
                    $scope.serverStatus();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                    clearTimeout($scope.server_run);
                    $scope.server_run = false;
                });
        };

        // delete a task on check
        $scope.stopServer = function(id) {
            console.log('stop server');
            $http.get('/api/scanner/stop')
                .success(function(data) {
                    clearTimeout($scope.server_run);
                    $scope.server_run = false;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                    clearTimeout($scope.server_run);
                    $scope.server_run = false;
                });
        };



    });

})(window.angular);

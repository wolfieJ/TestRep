/**
 * Created by Balachandran on 3/28/2016.
 */
var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Controller connected successfully");

    var refresh = function () {
        $http.get('/contactlist').success(function (response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        }); //Creates a route contactlist through which we get data from


    };

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function (response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function (response) {
            refresh();
        });
    };


}]);
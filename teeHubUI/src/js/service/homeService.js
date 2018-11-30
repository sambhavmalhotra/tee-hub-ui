define([], function () {
    angular.module("homeServiceModule", [])
        .service("homeServiceService", ['$http', function ($http) {

            this.getData = function () {
                return $http.get("http://localhost:8000/getTShirtsData");
            };
        }]);
});

'use strict';
// Declare app level module which depends on views, and components
define([
        'jquery',
        'angular',
        "./components/home.html", //001
        'angular-route',
        'angular-cookies',
        'angular-sanitize',
        'ui-bootstrap4',
        'font-awesome/css/font-awesome.css',
        "bootstrap/dist/css/bootstrap.css",
        "bootstrap/dist/js/bootstrap.min.js",
        'angular-promise-tracker',
        './components/home.js',
        './service/homeService.js',
        '../css/app.css'
    ], function(
        jquery,
        angular,
        homeTemplate) {

        angular.module("teeHubApp",[
            'ngRoute',
            'ngCookies',
            'ngSanitize',
            'ui.bootstrap',
            'ajoslin.promise-tracker',
            'homeModule',
            'homeServiceModule'
            ])
            .config([
                '$routeProvider',
                function($routeProvider) {
                    $routeProvider.when("/", {
                        templateUrl: homeTemplate
                    }).otherwise({
                        redirectTo:'/'
                    })
                }
            ])
    }
);

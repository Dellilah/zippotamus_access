var app = angular.module("zippoApp", ['google-maps', 'ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/',
		{
			controller: "ZippoController",
			templateUrl: "./app/partials/main.html"
		})
	.otherwise({redirectTo: '/'});
});
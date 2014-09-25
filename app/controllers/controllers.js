app.controller('ZippoController', function ($scope, $http, zippoService) {

	init();

	function init() {
		$scope.supported_countries = zippoService.getCountries();
		$scope.map = {
			center: {
				latitude: 0,
				longitude: 0
			},
			zoom: 2
		};
	}

	function all_countries() {
		var temp;
		$scope.all_countries = [];
		$http({method: 'GET', url: 'http://api.geonames.org/countryInfoJSON?username=Dellilah'}).
			success(function(data, status, headers, config) {
				temp = data;
				for(var i=temp.geonames.length; i>=10; i--){
					$scope.all_countries.push({country: temp.geonames[i].countryName, abbr: temp.geonames[i].countryCode});
				}
			}).
			error(function(data, status, headers, config) {
				alert("Przykro nam, brak danych");
			});
	}

	$scope.result = {};
    $scope.findInfo = function() {

		$http({method: 'GET', url: 'http://api.zippopotam.us/'+$scope.cn.abbr+'/'+$scope.zipcode}).
			success(function(data, status, headers, config) {
				$scope.result = data;
				$scope.map = {
					center: {
						latitude: parseFloat(data.places[0].latitude),
						longitude: parseFloat(data.places[0].longitude)
					},
					zoom: 10
				};
				$scope.markers =[ {
					latitude: parseFloat(data.places[0].latitude),
					longitude: parseFloat(data.places[0].longitude)
				}];
				$scope.cn = '';
				$scope.zipcode = '';
			}).
			error(function(data, status, headers, config) {
				alert("Przykro nam, brak danych");
			});
    };
});

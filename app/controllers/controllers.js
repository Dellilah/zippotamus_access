app.controller('ZippoController', function ($scope, $http, zippoService) {

	init();

	function init() {
		$scope.supported_countries = zippoService.getCountries();
		mapInit();
	}

	function mapInit() {
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
				var lat_c = parseFloat(data.places[0].latitude);
				var lon_c = parseFloat(data.places[0].longitude);
				if ( isNaN(lat_c) || isNaN(lon_c) || lat_c > 85 || lat_c < -85 || lon_c > 180 || lon_c < -180) {
					mapInit();
				}
				else {
					$scope.map = {
						center: {
							latitude: lat_c,
							longitude: lon_c
						},
						zoom: 10
					};
				}
				$scope.markers = [];
				for (var i = data.places.length - 1; i >= 0; i--) {
					$scope.markers.push({
						latitude: parseFloat(data.places[i].latitude),
						longitude: parseFloat(data.places[i].longitude)
					});
				};
				$scope.cn = '';
				$scope.zipcode = '';
			}).
			error(function(data, status, headers, config) {
				alert("Przykro nam, brak danych");
			});
    };
});

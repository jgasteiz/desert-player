var mplayer = {};

mplayer.app = angular.module("musicPlayer", ['ngRoute', 'ngResource']);

mplayer.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateUrl: 'static/views/home.html',
			controller: 'HomeCtrl'
		})
		.when('/artists', {
			templateUrl: 'static/views/artists.html',
			controller: 'ArtistsCtrl'
		})
		.when('/albums', {
			templateUrl: 'static/views/albums.html',
			controller: 'AlbumsCtrl'
		})
		.when('/songs', {
			templateUrl: 'static/views/songs.html',
			controller: 'SongsCtrl'
		})
		.otherwise({
			templateUrl: 'static/views/404.html'
		})
}]);

mplayer.app.service('SongsService', ['$resource', function($resource) {

	var Songs = $resource('/_api/audio/');

	return {
		Songs: Songs
	};
}]);

mplayer.app.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	}
}]);

mplayer.app.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.title = 'This is home';
}]);

mplayer.app.controller('ArtistsCtrl', ['$scope', function($scope) {
	$scope.title = 'This is artists';
}]);

mplayer.app.controller('AlbumsCtrl', ['$scope', function($scope) {
	$scope.title = 'This is artists';
}]);

mplayer.app.controller('SongsCtrl', ['$scope', 'SongsService', function($scope, SongsService) {
	$scope.title = 'This is songs';
	$scope.songs = SongsService.Songs.query();
}]);

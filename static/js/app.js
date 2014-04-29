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
			templateUrl: 'static/views/artist_list.html',
			controller: 'ArtistsCtrl'
		})
		.when('/artists/:artist/', {
			templateUrl: 'static/views/artist_detail.html',
			controller: 'SingleArtistCtrl'
		})
		.when('/albums', {
			templateUrl: 'static/views/album_list.html',
			controller: 'AlbumsCtrl'
		})
		.when('/albums/:album/', {
			templateUrl: 'static/views/album_detail.html',
			controller: 'SingleAlbumCtrl'
		})
		.when('/tracks', {
			templateUrl: 'static/views/tracks.html',
			controller: 'TracksCtrl'
		})
		.otherwise({
			templateUrl: 'static/views/404.html'
		})
}]);

var mplayer = {};

mplayer.app = angular.module("musicPlayer", ['ngRoute', 'ngResource'], function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

mplayer.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateUrl: 'static/templates/views/home.html',
			controller: 'HomeCtrl'
		})
		.when('/artists', {
			templateUrl: 'static/templates/views/artist_list.html',
			controller: 'ArtistsCtrl'
		})
		.when('/artists/:artist/', {
			templateUrl: 'static/templates/views/artist_detail.html',
			controller: 'SingleArtistCtrl'
		})
		.when('/albums', {
			templateUrl: 'static/templates/views/album_list.html',
			controller: 'AlbumsCtrl'
		})
		.when('/albums/:album/', {
			templateUrl: 'static/templates/views/album_detail.html',
			controller: 'SingleAlbumCtrl'
		})
		.when('/tracks', {
			templateUrl: 'static/templates/views/tracks.html',
			controller: 'TracksCtrl'
		})
		.when('/videos', {
			templateUrl: 'static/templates/views/videos.html',
			controller: 'VideosCtrl'
		})
		.when('/video', {
			templateUrl: 'static/templates/views/video.html',
			controller: 'VideoCtrl'
		})
		.otherwise({
			templateUrl: 'static/templates/views/404.html'
		})
}]);

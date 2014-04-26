mplayer.app.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function(route) {
		return route === $location.path();
	};
}]);

mplayer.app.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.title = 'This is home';
}]);

mplayer.app.controller('ArtistsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'This is artists';
	$scope.artists = AudioService.Artists.query();
}]);

mplayer.app.controller('AlbumsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'This is artists';
	$scope.albums = AudioService.Albums.query();
}]);

mplayer.app.controller('SongsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'This is songs';
	$scope.songs = AudioService.Songs.query();

	$scope.onPlay = 'Nothing yet.'
	$scope.play = function(songTitle) {
		$scope.onPlay = songTitle;
	};
}]);
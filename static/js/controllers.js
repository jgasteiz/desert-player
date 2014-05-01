mplayer.app.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function(route) {
		var locationPath = $location.path();
		return locationPath.indexOf(route) === 0;
	};

	$scope.active = 'meh';

	$scope.onPlay = 'Nothing yet.';
	$scope.play = function(track) {
		$scope.onPlay = track;
	};
}]);

mplayer.app.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.title = 'This is home';
}]);

mplayer.app.controller('ArtistsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'This is artists';
	$scope.artists = AudioService.Artists.query();
}]);

mplayer.app.controller('SingleArtistCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
	$scope.title = 'This is one artist';
	$scope.artist = AudioService.Artist.get({artistId: $routeParams.artist}, function(artist) {
		console.log(artist);
	});
}]);

mplayer.app.controller('AlbumsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'All albums';
	$scope.albums = AudioService.Albums.query();
}]);

mplayer.app.controller('SingleAlbumCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
	$scope.title = '';
	$scope.album = AudioService.Album.get({albumId: $routeParams.album}, function(album) {
		$scope.title = album.name + ' - ' + album.artist;
	});
}]);

mplayer.app.controller('TracksCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'All tracks';
	$scope.tracks = AudioService.Tracks.query();
}]);
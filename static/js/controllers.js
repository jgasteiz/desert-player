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

mplayer.app.controller('SingleArtistCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
	$scope.title = 'This is one artist';
	$scope.artist = AudioService.Artist.get({artistId: $routeParams.artist}, function(artist) {
		console.log(artist);
	});
}]);

mplayer.app.controller('AlbumsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'This is albums';
	$scope.albums = AudioService.Albums.query();
}]);

mplayer.app.controller('SingleAlbumCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
	$scope.title = 'This is one album';
	$scope.album = AudioService.Album.get({albumId: $routeParams.album}, function(album) {
		console.log(album);
	});

	$scope.onPlay = 'Nothing yet.'
	$scope.play = function(trackTitle) {
		$scope.onPlay = trackTitle;
	};
}]);

mplayer.app.controller('TracksCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'This is tracks';
	$scope.tracks = AudioService.Tracks.query();

	$scope.onPlay = 'Nothing yet.'
	$scope.play = function(trackTitle) {
		$scope.onPlay = trackTitle;
	};
}]);
mplayer.app.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function(route) {
		var locationPath = $location.path();

		if (locationPath.indexOf('video') > -1) {
			$scope.videoMode = true;
		} else {
			$scope.videoMode = false;
		}

		return locationPath.indexOf(route) === 0;
	};

	$scope.trackOnPlay = null;
	$scope.selectedTrack = null;
	$scope.albumOnPlay = null;
	$scope.searchString = '';

	$scope.queue = [];

	$scope.play = function(track, album) {
		if (album) {
			$scope.albumOnPlay = album;
			var trackList = album.tracks.slice(0),
				currentTrackIndex = album.tracks.indexOf(track);
			for (var i = 0; i < currentTrackIndex; i++) {
				trackList.push(trackList.shift());
			}
			$scope.queue = trackList;
			$scope.trackOnPlay = $scope.queue[0];
		} else {
			$scope.trackOnPlay = track;
			$scope.albumOnPlay = null;
		}
	};

	$scope.selectTrack = function(track, album) {
		$scope.selectedTrack = track;
		if (album) {
			$scope.selectedAlbum = album;
		} else {
			$scope.selectedAlbum = null;
		}
	};

	$scope.$watch('trackOnPlay', function(newValue, oldValue) {
		if (newValue !== oldValue) {
			$scope.selectedTrack = null;
		}
	})
}]);

mplayer.app.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.title = 'This is home';
}]);

mplayer.app.controller('ArtistsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
	$scope.title = 'All artists';
	$scope.artists = AudioService.Artists.query();
}]);

mplayer.app.controller('SingleArtistCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
	$scope.title = '';
	$scope.artist = AudioService.Artist.get({artistId: $routeParams.artist}, function(artist) {
		$scope.title = 'Albums by ' + artist.name;
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

mplayer.app.controller('VideosCtrl', ['$scope', '$sce', 'AudioService', function($scope, $sce, AudioService) {
	$scope.title = 'All videos';
	$scope.videos = AudioService.Videos.query();

	$scope.playVideo = function(video) {
		$scope.videoUrl = video.src;
	};

	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
}]);

mplayer.app.controller('VideoCtrl', ['$scope', function($scope) {
	$scope.title = 'Local video player';
}]);

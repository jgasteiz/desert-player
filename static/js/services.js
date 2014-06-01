mplayer.app.service('AudioService', ['$resource', function($resource) {

	var Tracks = $resource('/_api/tracks/'),
		Videos = $resource('/_api/videos/'),
		Albums = $resource('/_api/albums/'),
		Album = $resource('/_api/albums/:albumId/', {albumId: '@id'}),
		Artists = $resource('/_api/artists/'),
		Artist = $resource('/_api/artists/:artistId/', {artistSlug: '@id'});

	return {
		Tracks: Tracks,
		Videos: Videos,
		Albums: Albums,
		Album: Album,
		Artists: Artists,
		Artist: Artist
	};
}]);
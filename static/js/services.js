mplayer.app.service('AudioService', ['$resource', function($resource) {

	var Songs = $resource('/_api/songs/'),
		Albums = $resource('/_api/albums/'),
		Artists = $resource('/_api/artists/');

	return {
		Songs: Songs,
		Albums: Albums,
		Artists: Artists
	};
}]);
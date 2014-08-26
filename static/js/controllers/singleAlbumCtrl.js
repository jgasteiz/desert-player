var mplayer = mplayer || {};

mplayer.app.controller('SingleAlbumCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
    $scope.title = '';
    $scope.album = AudioService.Album.get({albumId: $routeParams.album}, function(album) {
        $scope.title = album.name + ' - ' + album.artist;
    });
}]);
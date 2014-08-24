mplayer.app.controller('SingleArtistCtrl', ['$scope', '$routeParams', 'AudioService', function($scope, $routeParams, AudioService) {
    $scope.title = '';
    $scope.artist = AudioService.Artist.get({artistId: $routeParams.artist}, function(artist) {
        $scope.title = 'Albums by ' + artist.name;
    });
}]);
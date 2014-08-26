mplayer.app.controller('ArtistsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
    $scope.title = 'All artists';
    $scope.artists = AudioService.Artists.query();
}]);
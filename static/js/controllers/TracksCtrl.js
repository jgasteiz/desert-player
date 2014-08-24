mplayer.app.controller('TracksCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
    $scope.title = 'All tracks';
    $scope.tracks = AudioService.Tracks.query();
}]);
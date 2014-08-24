mplayer.app.controller('AlbumsCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
    $scope.title = 'All albums';
    $scope.albums = AudioService.Albums.query();
}]);
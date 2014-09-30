var mplayer = mplayer || {};

mplayer.app.controller('TracksCtrl', ['$scope', 'AudioService', function($scope, AudioService) {
    $scope.title = 'All tracks';

    $scope.paginateBy = 50;
    $scope.page = 1;

    $scope.tracks = AudioService.Tracks.query({
        paginateBy: $scope.paginateBy,
        page: $scope.page
    });

    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;

        AudioService.Tracks.query({
            paginateBy: $scope.paginateBy,
            page: $scope.page
        }, function(data) {
            $scope.tracks = $scope.tracks.concat(data);
        }, function(data) {
            debugger;
        });
    };
}]);
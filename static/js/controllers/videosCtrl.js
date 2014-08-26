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
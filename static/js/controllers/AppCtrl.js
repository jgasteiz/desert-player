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
    });
}]);
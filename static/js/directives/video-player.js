mplayer.app.directive('videoPlayer', function($sce, $interval) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'static/templates/directives/video_player.html',
        link: function(scope, element, attrs) {

            var $videoEl = $(element).find('#video-player'),
                videoNode = $videoEl[0],
                canPlay = null,
                progressInterval = null,
                $currentTime = $(element).find('#current-time'),
                $videoFile = $(element).find('#video-file'),
                $srtFile = $(element).find('#srt-file');

            var stopProgress = function() {
                if (angular.isDefined(progressInterval)) {
                    $interval.cancel(progressInterval);
                    progressInterval = undefined;
                }
            };

            scope.videoUrl = '';

            scope.loadVideo = function() {
                var file = $videoFile[0].files[0];
                if (!file) {
                    scope.message = "You have to pick a video first.";
                    return false;
                }

                canPlay = videoNode.canPlayType(file.type);

                if (canPlay !== '') {
                    scope.videoUrl = URL.createObjectURL(file);
                    scope.isLoaded = true;
                    scope.message = "";
                } else {
                    scope.isLoaded = false;
                    scope.message = "The video can't be played.";
                }
            };

            scope.goFullScreen = function() {
                if (videoNode.requestFullscreen) {
                    videoNode.requestFullscreen();
                    scope.isFullScreen = true;
                } else if (videoNode.msRequestFullscreen) {
                    videoNode.msRequestFullscreen();
                    scope.isFullScreen = true;
                } else if (videoNode.mozRequestFullScreen) {
                    videoNode.mozRequestFullScreen();
                    scope.isFullScreen = true;
                } else if (videoNode.webkitRequestFullscreen) {
                    videoNode.webkitRequestFullscreen();
                    scope.isFullScreen = true;
                }
            };

            scope.exitFullScreen = function() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    scope.isFullScreen = false;
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                    scope.isFullScreen = false;
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                    scope.isFullScreen = false;
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                    scope.isFullScreen = false;
                }
            };

            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            };

            scope.isPlaying = false;

            scope.play = function() {
                if ($videoEl.attr('src')) {
                    $videoEl[0].play();
                    scope.isPlaying = true;

                    $videoEl.off('ended').on('ended', function() {
                        scope.next({apply: true});
                    });
                    progressInterval = $interval(function() {
                        if (isNaN(videoNode.duration) === false) {
                            var currentProgress = (videoNode.currentTime / videoNode.duration) * 100;
                            $currentTime.css('left', currentProgress + '%');
                        }
                    }, 100);
                }
            };

            scope.moveToTime = function(e) {
                // Get the clicked time in percentage.
                var $target = $(e.currentTarget),
                    targetWidth = $target.width(),
                    clickPosition = e.pageX - $target.offset().left,
                    clickedProgress = (clickPosition / targetWidth) * 100;

                // Change the videoNode current time to the clicked percentage.
                videoNode.currentTime = (videoNode.duration * clickedProgress) / 100;
            };

            scope.pause = function() {
                if ($videoEl.attr('src')) {
                    stopProgress();
                    $videoEl[0].pause();
                    scope.isPlaying = false;
                }
            };
        }
    }
});
mplayer.app.directive('player', function($interval) {
    return {
        restrict: 'E',
        scope: {
            track: '=',
            album: '=',
            queue: '='
        },
        templateUrl: 'static/templates/directives/player.html',
        link: function(scope, element) {

            var $audioEl = element.find('audio'),
                audioNode = $audioEl[0],
                $progress = $(element).find('#track-progress'),
                progressInterval = null;

            var stopProgress = function() {
                if (angular.isDefined(progressInterval)) {
                    $interval.cancel(progressInterval);
                    progressInterval = undefined;
                }
            };

            scope.isPlaying = false;

            scope.play = function() {
                if ($audioEl.attr('src')) {
                    audioNode.play();
                    scope.isPlaying = true;

                    $audioEl.off('ended').on('ended', function() {
                        scope.next({apply: true});
                    });
                }
                progressInterval = $interval(function() {
                    if (isNaN(audioNode.duration) === false) {
                        var currentProgress = 100 - (audioNode.currentTime / audioNode.duration) * 100;
                        $progress.css('right', currentProgress + '%');
                    }
                }, 100);
            };

            scope.pause = function() {
                if ($audioEl.attr('src')) {
                    stopProgress();
                    audioNode.pause();
                    scope.isPlaying = false;
                }
            };

            // TODO: make this work
            scope.moveToTime = function(e) {
                // Get the clicked time in percentage.
                var $target = $(e.currentTarget),
                    targetWidth = $target.width(),
                    clickPosition = e.pageX - $target.offset().left,
                    clickedProgress = (clickPosition / targetWidth) * 100;

                // Change the audioNode current time to the clicked percentage.
                audioNode.currentTime = (audioNode.duration * clickedProgress) / 100;
            };

            // TODO: make this better. This is horrible.
            scope.next = function(options) {
                if (options && options.apply) {
                    scope.$apply(function() {
                        scope.queue.push(scope.queue.shift());
                        scope.track = scope.queue[0];
                    });
                } else {
                    scope.queue.push(scope.queue.shift());
                    scope.track = scope.queue[0];
                }
            };

            scope.previous = function() {
                scope.queue.unshift(scope.queue.pop());
                scope.track = scope.queue[0];
            };

            scope.$watch('track', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.play();
                }
            });
        }
    }
});

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

mplayer.app.directive('grid', function($location) {
    return {
        restrict: 'E',
        scope: {
            items: '=',
            url: '@'
        },
        templateUrl: 'static/templates/directives/grid.html',
        link: function(scope) {
            scope.navigate = function(url, itemId) {
                $location.path(url + '/' + itemId + '/');
            };

            scope.filterItems = function(itemName, searchString) {
                if (searchString && searchString !== '') {
                    itemName = itemName.toLowerCase();
                    searchString = searchString.toLowerCase();
                    return itemName.indexOf(searchString) > -1;
                }
                return true;
            };
        }
    }
});

mplayer.app.directive('list', function() {
    return {
        restrict: 'E',
        scope: {
            tracks: '=',
            album: '=',
            onClick: '&',
            onDblClick: '&',
            isSelected: '=',
            isPlaying: '='
        },
        templateUrl: 'static/templates/directives/list.html',
        link: function(scope) {
            scope.filterItems = function(itemName, searchString) {
                if (searchString && searchString !== '') {
                    itemName = itemName.toLowerCase();
                    searchString = searchString.toLowerCase();
                    return itemName.indexOf(searchString) > -1;
                }
                return true;
            };
        }
    }
});

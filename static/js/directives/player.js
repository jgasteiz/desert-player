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

            scope.moveToTime = function(e) {
                // Get the clicked time in percentage.
                var $target = $(e.currentTarget),
                    targetWidth = $target.width(),
                    clickPosition = e.pageX - $target.offset().left,
                    clickedProgress = (clickPosition / targetWidth) * 100,
                    newtime = (audioNode.duration * clickedProgress) / 100;

                // Change the audioNode current time to the clicked percentage.
                // TODO: this doesn't work properly, fix it.
                // audioNode.pause();
                // audioNode.currentTime = parseFloat(newtime.toFixed(2));
                // audioNode.play();
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
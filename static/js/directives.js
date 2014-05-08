mplayer.app.directive('player', function() {
	return {
		restrict: 'E',
		scope: {
			track: '=',
			album: '=',
			queue: '='
		},
		templateUrl: 'static/templates/directives/player.html',
		link: function(scope, element, attrs) {

			var $audioEl = element.find('audio');
			scope.isPlaying = false;

			scope.play = function() {
				if ($audioEl.attr('src')) {
					$audioEl[0].play();
					scope.isPlaying = true;

					$audioEl.off('ended').on('ended', function() {
						scope.next();
					});
				}
			};

			scope.pause = function() {
				if ($audioEl.attr('src')) {
					$audioEl[0].pause();
					scope.isPlaying = false;
				}
			};

			scope.next = function() {
				scope.queue.push(scope.queue.shift());
				scope.track = scope.queue[0];
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
		templateUrl: 'static/templates/directives/list.html'
	}
});

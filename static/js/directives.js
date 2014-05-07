mplayer.app.directive('player', function() {
	return {
		restrict: 'E',
		scope: {
			track: '=',
			album: '='
		},
		templateUrl: 'static/templates/directives/player.html',
		link: function(scope, element, attrs) {
			scope.audioEl = element.find('audio');
			scope.isPlaying = false;

			scope.play = function() {
				if (scope.audioEl.attr('src')) {
					scope.audioEl[0].play();
					scope.isPlaying = true;
				}
			};

			scope.pause = function() {
				if (scope.audioEl.attr('src')) {
					scope.audioEl[0].pause();
					scope.isPlaying = false;
				}
			};

			scope.$watch('track', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					scope.play();
				}
			});

		}
	}
});

mplayer.app.directive('grid', function() {
	return {
		restrict: 'E',
		scope: {
			items: '=',
			url: '@'
		},
		templateUrl: 'static/templates/directives/grid.html'
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

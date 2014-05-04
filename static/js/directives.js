mplayer.app.directive('player', function() {
	return {
		restrict: 'E',
		scope: {
			title: '@',
			src: '@'
		},
		templateUrl: 'static/templates/directives/player.html'
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
			items: '=',
			onClick: '&',
			isActive: '='
		},
		templateUrl: 'static/templates/directives/list.html'
	}
});
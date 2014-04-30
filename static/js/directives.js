mplayer.app.directive('player', function() {
	return {
		restrict: 'E',
		scope: {
			title: '@',
			src: '@'
		},
		template: '<audio src="{{src}}" controls></audio>'
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
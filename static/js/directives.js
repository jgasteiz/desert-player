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
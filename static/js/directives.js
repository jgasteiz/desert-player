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
						scope.next({apply: true});
					});
				}
			};

			scope.pause = function() {
				if ($audioEl.attr('src')) {
					$audioEl[0].pause();
					scope.isPlaying = false;
				}
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

mplayer.app.directive('videoPlayer', function($sce) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'static/templates/directives/video_player.html',
		link: function(scope, element, attrs) {

			var videoNode = null,
				canPlay = null;
			scope.videoUrl = '';

			scope.playVideo = function() {
				var file = element.find('input')[0].files[0];
				if (!file) {
					scope.message = "You have to pick a video first.";
					return false;
				}

				videoNode = element.find('video')[0];
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

			var $videoEl = element.find('video');
			scope.isPlaying = false;

			scope.play = function() {
				if ($videoEl.attr('src')) {
					$videoEl[0].play();
					scope.isPlaying = true;

					$videoEl.off('ended').on('ended', function() {
						scope.next({apply: true});
					});
				}
			};

			scope.pause = function() {
				if ($videoEl.attr('src')) {
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

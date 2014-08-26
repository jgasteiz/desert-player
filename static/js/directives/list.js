var mplayer = mplayer || {};

mplayer.app.directive('list', function() {
    return {
        restrict: 'E',
        scope: {
            tracks: '=',
            album: '=',
            onClick: '&',
            onDblClick: '&',
            onOptionsClick: '&',
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
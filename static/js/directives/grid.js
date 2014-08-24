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
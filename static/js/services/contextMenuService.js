var mplayer = mplayer || {};

mplayer.app.service('contextMenuService', [function() {

    this.showMenu = function (menuContext) {

        var _getOffset = function(element) {
            var offsetTop = element.offsetTop,
                offsetLeft = element.offsetLeft;

            var el = element;

            // get offset top
            while (true) {
                if (el.offsetParent.offsetTop == 0) {
                    break;
                } else {
                    el = el.offsetParent;
                    offsetTop = offsetTop + el.offsetTop;
                }
            }

            // get offset left
            el = element;
            while (true) {
                if (el.offsetParent.offsetLeft == 0) {
                    break;
                } else {
                    el = el.offsetParent;
                    offsetLeft = offsetLeft + el.offsetLeft;
                }
            }

            return {
                offsetTop: offsetTop,
                offsetLeft: offsetLeft
            };
        };

        var menuOptions = menuContext.options;

        var menuElement = document.createElement('ul');
        menuElement.className = 'context-menu';

        for (var menuItemText in menuOptions) {
            var menuItem = document.createElement('li');
            menuItem.innerText = menuItemText;
            menuElement.appendChild(menuItem);
        }

        document.body.appendChild(menuElement);

        var offset = _getOffset(menuContext.element);

        menuElement.style.top = offset.offsetTop + 'px';
        menuElement.style.left = offset.offsetLeft + 'px';
    };
}]);

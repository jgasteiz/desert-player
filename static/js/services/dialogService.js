var mplayer = mplayer || {};

mplayer.app.service('dialogService', ['$modal', function($modal) {
    var dialogDefaults = {
        backdrop: false,
        keyboard: true,
        templateUrl: 'static/templates/services/dialog-service.html'
    };

    var dialogOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModalDialog = function (customDialogDefaults, customDialogOptions) {
        if (!customDialogDefaults) customDialogDefaults = {};
        this.showDialog(customDialogDefaults, customDialogOptions);
    };

    this.showDialog = function (customDialogDefaults, customDialogOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempDialogDefaults = {};
        var tempDialogOptions = {};

        //Map angular-ui dialog custom defaults to dialog defaults defined in this service
        angular.extend(tempDialogDefaults, dialogDefaults, customDialogDefaults);

        //Map dialog.html $scope custom properties to defaults defined in this service
        angular.extend(tempDialogOptions, dialogOptions, customDialogOptions);

        if (!tempDialogDefaults.controller) {
            tempDialogDefaults.controller = function ($scope, $modalInstance, items) {
                $scope.items = items;
                $scope.selected = {
                    item: $scope.items[0]
                };

                $scope.ok = function () {
                    $modalInstance.close($scope.selected.item);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        }

        tempDialogDefaults.resolve = {
            items: function () {
                return [];
            }
        };

        $modal.open(tempDialogDefaults);
    };

    this.showMessage = function (title, message, buttons) {
        var defaultButtons = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];
        var msgBox = new $modal.modal({
            dialogFade: true,
            templateUrl: 'template/dialog/message.html',
            controller: 'MessageBoxController',
            resolve:
                    {
                        model: function () {
                            return {
                                title: title,
                                message: message,
                                buttons: buttons == null ? defaultButtons : buttons
                            };
                        }
                    }
        });
        return msgBox.open();
    };
}]);

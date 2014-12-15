'use strict';
angular.module('mbApp.services', []).factory('fileStorage', ['$rootScope', function ($rootScope) {
    var fileStorage;
    if(typeof(Storage) !== "undefined") {
        fileStorage = angular.fromJson(localStorage.getItem("mbData"));
        if (!fileStorage) {
            fileStorage = [
                {
                    "id": 1,
                    "name": "index",
                    "type": "html",
                    "content": '<a href="#">Hello World!</a>',
                    "blob": "data:text/html;base64,PGEgaHJlZj0iIyI+SGVsbG8gV29ybGQhPC9hPg==",
                    "bookmarked": false
                },
                {
                    "id": 2,
                    "name": "info",
                    "type": "text",
                    "content": "Hello World!",
                    "blob": "data:text/plain;base64,SGVsbG8gV29ybGQh",
                    "bookmarked": true
                }
                //{
                //    "id": 3,
                //    "name": "photo",
                //    "type": "image",
                //    "content": "data:image/png;base64,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",
                //    "blob": "data:image/png;base64,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",
                //    "bookmarked": false
                //}
            ];
            try {
                localStorage.setItem("mbData", angular.toJson(fileStorage));
            }
            catch (e) {
                window.alert('Storage failed: ' + e + '\n You won\'t be able to edit or add new files');
            }
        }
    }
    else {
        window.alert('Your browser does not support localStorage, you won\'t be able to edit or add new files');
    }

    $rootScope.$watch(function () { return fileStorage; }, function (newVal) {
        localStorage.setItem("mbData", angular.toJson(newVal));
    });
    return fileStorage;
}]);

angular.module('mbApp.controllers', []).controller('indexCtrl', ['$scope', '$stateParams', '$modal', 'fileStorage', 'Facebook', function($scope, $stateParams, $modal, fileStorage, Facebook) {
    if($stateParams.bookmarks) fileStorage = _.where(fileStorage, {bookmarked: true});
    $scope.files = _.sortBy(fileStorage, 'name');
    $scope.fileSize = function (file) {
        var blob;
        switch (file.type) {
            case 'text':
                blob = new Blob([file.content], {type: "text/plain"});
                break;
            case 'html':
                blob = new Blob([file.content], {type: "text/html"});
                break;
        }
        return blob.size;

    };
    $scope.filterByName = function () {
        $scope.files = _.filter(_.sortBy(fileStorage, 'name'), function (obj) {
           return obj.name.search($scope.filter)>-1;
        });
    };
    $scope.download = function (file) {
        var blob, canvas;

        switch (file.type) {
            case 'text':
                blob = new Blob([file.content], {type: "text/plain"});
                break;
            case 'html':
                blob = new Blob([file.content], {type: "text/html"});
                break;
            case 'image':
                canvas = angular.element('canvas');
                var ctx = canvas.getContext("2d"),
                    img = new Image;
                img.src = file.blob;
                ctx.putImageData(img.getData());
        }
        if (canvas) {
            canvas.toBlob(function (blob) {
                saveAs(blob, file.name);
            });
        }
        else saveAs(blob, file.name);
    };
    $scope.bookmark = function (file) {
        debugger;
        file.bookmarked = file.bookmarked ? false : true;
    };
    $scope.preview = function (file) {

    };
    $scope.edit = function (file) {

    };
    $scope.upload = function () {
        var uploadModal = $modal.open({
            templateUrl: '/partials/upload.html',
            controller: 'uploadCtrl'
        });
    };
    $scope.uploadFB = function () {
        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                debugger;
                getAlbums();
            } else {
                Facebook.login(function(response) {
                    debugger;
                    getAlbums();
                });
            }
        });
    }
}])

.controller('uploadCtrl', ['$scope', '$stateParams', '$modalInstance', 'fileStorage','$timeout', 'Facebook', function($scope, $stateParams, $modalInstance, fileStorage, $timeout, Facebook) {

    $scope.uploadFromPc = function (file) {
        debugger;
        $timeout(function() {
            angular.element('#imgUpload').trigger('click');
        });
    };
        $scope.$watch('selectedFile', function (file) {
            debugger;
        });
    //$scope.handleFile = function (file) {
    //    debugger;
    //    var d = document.getElementById("fileList");
    //    if (!files.length) {
    //        d.innerHTML = "<p>No files selected!</p>";
    //    } else {
    //        var list = document.createElement("ul");
    //        d.appendChild(list);
    //        for (var i = 0; i < files.length; i++) {
    //            var li = document.createElement("li");
    //            list.appendChild(li);
    //
    //            var img = document.createElement("img");
    //            img.src = window.URL.createObjectURL(files[i]);
    //            ;
    //            img.height = 60;
    //            img.onload = function () {
    //                window.URL.revokeObjectURL(this.src);
    //            }
    //            li.appendChild(img);
    //
    //            var info = document.createElement("span");
    //            info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
    //            li.appendChild(info);
    //        }
    //    }
    //}
}]);

angular
    .module('mbApp', [
        'mbApp.controllers',
        'mbApp.services',
        'ui.router',
        'ui.bootstrap',
        'angularFileUpload',
        'facebook'
    ])
    .config([
        '$stateProvider',
        'FacebookProvider',
        function ($stateProvider, FacebookProvider) {
            FacebookProvider.init('821914054533130');
            $stateProvider
                .state('index', {
                    url: '?bookmarks',
                    controller: "indexCtrl",
                    templateUrl: "/partials/index.html"
                })
        }])
    .run([
        '$rootScope',
        function ($rootScope) {

        }]);

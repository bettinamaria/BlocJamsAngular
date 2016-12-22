 (function() {
     function AlbumCtrl(Fixtures, $scope) {
        $scope.albumData = Fixtures.getAlbum();
     }
 
     angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures','$scope', AlbumCtrl]);
 })();
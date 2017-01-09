 (function() {
     function AlbumCtrl(Fixtures, $scope, SongPlayer) {
        $scope.albumData = Fixtures.getAlbum();
        $scope.songPlayer = SongPlayer;
     }
 
     angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures','$scope', AlbumCtrl, 'SongPlayer']);
 })();
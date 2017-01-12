 (function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
         
         /**
         * @desc Stores album information in SongPlayer to access  songs from current album.
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();
         
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         SongPlayer.volume = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
             
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            }); 
             
            SongPlayer.currentSong = song;
         };

         
          /**
         * @desc Retrieves exact index of the song on the current album.
         * @param {Object} song
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
         
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
         
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
         
         
          /**
         * @function playSong
         * @desc Plays current Buzz object. 
         * @param {Object} song
         */
         var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
         };
         
          /**
         * @function stopSong
         * @desc Stops current Buzz object. 
         * @param {Object} song
         */
         var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;

         };
         
         
         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             console.log('attempting play');
                    song = song || SongPlayer.currentSong;
                    if (SongPlayer.currentSong !== song) {
                    setSong(song);
                    playSong(song);
            } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
               }   
          };
    
         /**
         * @function pause
         * @desc Pause current Buzz Object
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
     };
     
         /**
         * @function previous
         * @desc Play previous song
         * @desc Retrieves index of currently playing song and then decreases that index by one to show previous played song. 
         * @type {Object} song
         * @desc If current index is less than 0 i.e. user is at first song in play list, currently playing song is stopped and set to first song.
         */
         SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
             
        if  (currentSongIndex < 0) {
            stopSong(song);
            SongPlayer.currentSong.playing = null;
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
         }
     };
         
         /**
         * @function next
         * @desc Play next song
         * @desc Retrieves index of currently playing song and then increases that index by one to start next song. 
         */
         SongPlayer.next = function() {
             console.log("pushed next");
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
             
        if (currentSongIndex >= currentAlbum.songs.length) {
            console.log("current song index is " + currentSongIndex);
            stopSong(song);
            SongPlayer.currentSong.playing = null;
        } else {
            console.log("current song index greater than 0");
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
         }
     };
     
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
          SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
     };

        /**
         * @function setVolume
         * @desc Adds volume controls to player bar.
         * @param {Number} volume
         */
         SongPlayer.setVolume = function(volume) {
             SongPlayer.volume = volume;
             if (currentBuzzObject) {
                 currentBuzzObject.setVolume(volume);
             }
     };
     
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
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
             
            currentBuzzObject.bind('timeupdate', function()){
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
        });
         
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
         
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         Song.Player.currentTime = null;
         
         
          /**
         * @function playSong
         * @desc Plays current Buzz object. 
         * @param {Object} song
         */
         var playSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.play();
                song.playing = true;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
         };
         
          /**
         * @function stopSong
         * @desc Stops current Buzz object. 
         * @param {Object} song
         */
         var stopSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                song.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
         };
         
         
         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
                    song = song || SongPlayer.currentSong;
                    if (SongPlayer.currentSong !== song) {
                    setSong(song);
                    playSong(song);
            } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
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
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
             
        if (currentSongIndex > 0) {
            stopSong(song);
            SongPlayer.currentSong.playing = null;
        } else {
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
     
     
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
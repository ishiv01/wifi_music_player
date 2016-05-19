$(document).ready(function(){
	/*======== initilise start ==========*/
	//get the json data of the songs
      				var data = song_json_data;

      				
      				//loop through the data
      						$.each(data, function(key, val){
      							createList(key, val)
      						});
      						
      						
      						//grab the audio element and asigne it to audio var for easy use
      						var audio = document.getElementById('audio');

      							
      							
      						//set the playing state to false
      						var playing = false;
      						var song_id = 0;
      						
      					 audio.src=data[song_id].uri;
      							$('#playTime')
      							.text(data[song_id].time);
      							$('#playPause').html('<span class="glyphicon glyphicon-play"></span>');
      							audio.preload='metadata';
      							randArt();
      							$('#play-screen-title').text(data[song_id].title);
      							$('#play-screen-info').text('Album: ' + data[song_id].album + ' by ' +  data[song_id].artist);
      							document.getElementById('download').href= data[song_id].uri;
      						
      //update the current time section
   audio.addEventListener('timeupdate', function(){
      		
      		$('#currentTime')      		.text(parseTime(audio.currentTime));
      		var progress = Math.trunc((audio.currentTime/audio.duration)*100);
      		$('#currTime').css('width', progress + '%');
      	});
      	
      	//check for the end of the audio and play the next song
      	audio.addEventListener('ended', function(){
      		playNext();
      	});

      						
 /*======= inisilize end =========== */     					
 
 /*===== ALL CONTROL FUNCTIONS ======*/	
      						
      						//function to play or pause the audio
      						playpause = function(){
      							if(!playing){
      								audio.play();
      								playing = true;
      								$('#playPause')
      								.html('<span class="glyphicon glyphicon-pause"></span>');
      							} else {
      								audio.pause();
      								playing = false;
      								$('#playPause')
      								.html('<span class="glyphicon glyphicon-play"></span>');
      							}
      						}
      						
      						
      						//function to play next song
      						playNext = function(){
      							if(song_id<data.length-1){
      								song_id++;
      							}else{
      								song_id=0;
      							}
      							
      							playSong(song_id);
      						}	
      						
      						
      						//function to play next song
      						playPrev = function(){
      							if(song_id>0){
      								song_id--;
      							}else{
      								song_id=data.length-1;
      							}
      							playSong(song_id);
      							      						}
      						
      						//function to check click location and set new current time
      						$('.timeLine').on('click', function(event){
      							var x_pos = event.pageX;
      							var full_width = $(document).width();
      							var time_ratio = x_pos/full_width;
      							audio.currentTime = audio.duration*time_ratio;
      						});
      							

/*==== ALL CONTROL FUNCTIONS END =====*/      				
  
 
/*===== SUPPORT FUNCTIONS START =====*/ 
      				
      				//function to play selected song
      						playSong = function(id){
      						 window
      						 .navigator.vibrate(50);
      							song_id = id;
      							audio.pause();
      							audio.src=data[song_id].uri;
      							$('#playTime')
      							.text(data[song_id].time);
      							$('#playPause').html('<span class="glyphicon glyphicon-pause"></span>');
      							audio.play();
      								window
      								.navigator.vibrate(100);
      							randArt();
      							$('#play-screen-title').text(data[song_id].title);
      							$('#play-screen-info').text('Album: ' + data[song_id].album + ' by ' +  data[song_id].artist);
      							   							document.getElementById('download').href= data[song_id].uri;

      						}
      				
      				//function to create each list item
      				function createList(key, val){
      					
      					$('<li id="song-"' + key + '><a class="song" href="#song-' + key + '" onClick="playSong(' + key + ')" <span class="key">' + key + '.</span> <span class="title">' + val.title + '...</span><span style="float:right; margin-right:5px;">' + val.time + '</span><div class="song-info">' + val.album + ' | ' + val.artist + '</div></li>').appendTo("#playList");
      				}
      				
      		//displays random album arts
      	function randArt(){
      		var rand_num = Math.floor(Math.random()*10)+1; //generate a random nomber between 1 and 9
      		
      		$('#play-screen').css("background-image","url(\"img/images (" + rand_num + ").jpg\")");
      	}
      	
      	//function to parse the time from seconds to minute and sec i.e, 90sec to 1:30 mins
      	function parseTime(sec){
      		sec_2 = (Math.floor(sec)+1)%60;
      		secs = (Math.floor(sec)+1)/60;
      		min = Math.trunc(secs);
      		if(sec_2 < 10){
      			sec_2 = '0' + sec_2;
      		}
      		return min + ':' + sec_2;
      	}
      	
/*======= SUPPORT FUNCTION ENDS ======*/      	
/*========= WEB UI FUNCTIONS =========*/

      	$('#ham').click(function(){
      		$('#sideDrawer').fadeToggle();
      	});
      	
      		});
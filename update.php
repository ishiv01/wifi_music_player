<?php
   //include the getid3 libs
   include "getid3/getid3.php";
   //scan the dir for audio files
   $file_list = scandir("source/");
   //remove first 2 names
   $song_list = array_slice($file_list, 2);
   //variable to store the song data
   $songs_data_arr = [];
   //loop through all the songa an get all the info like artst, album, title
   foreach($song_list as $song){
   	//initilize the getid3 class
   $getInfo= new getID3();
   //analyze the mp3 file and store the info in $info var
   $info = $getInfo->analyze("source/" . $song);
   //insert the song info in new song array
   $song_info['title'] = $info['tags']['id3v2']['title'][0];
   $song_info['album'] = $info['tags']['id3v2']['album'][0];
   $song_info['artist'] = $info['tags']['id3v2']['artist'][0];
   $song_info['uri'] = "source/" . $song;
   $song_info['time'] = $info['playtime_string'];
   print_r($info['tags']['id3v2']['title'][0]);
   //finally push the info to the $song_data array
   array_push($songs_data_arr, $song_info);
  
   }
  $json_song_data = json_encode($songs_data_arr, JSON_PRETTY_PRINT);
  $json_file = fopen('songs_data.js', 'w');
  fwrite($json_file, 'var song_json_data=' . $json_song_data);
  fclose($json_file);
echo "<h1>Song Data has been created</h1>";
?>

# wifi_music_player
A web app for my Android device to host all the songs on my phone, to be played by others using wifi

To install it in your phone download the script and then you have to install "php runner" Android app.
Then extract the script to your "sdcard/htdocs/" folder.
Now you have to create "source" folder inside htdocs folder and keep all the songs inside it.
Once done, start the php runner app and click on "start server".
Then go to http://localhost:8080/update.php this will generate a songs_data.js file which stores the data of the songs.
All Done ! Now go to http://localhost:8080/ too see your music player.

Your friends can access is by connecting to tour wifi hotspot, and then to http://your ip address:8080

Currently we have to manually update the song list by going to http://localhost:8080/update.php

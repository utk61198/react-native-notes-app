# react-native-notes-app


Components are Main,Note and Newnote in app/components

for text to speech react-native-tts has been used

for speech to text react-native-voice has been used


Steps for setting localhost sync

1) download and install CouchDB and  create a single node server wuth username admin and password admin and allow inbound connection to 5984
https://docs.couchdb.org/en/stable/install/windows.html

2) In the file database.js configure the local host ip address make sure the device and laptop are connected to same wifi

3) install the following npm modules pouchdb-react-native, react-native-sqlite-2, pouchdb-adapter-react-native-sqlite

4) after following steps notes will sync perfectly after pressing the sync button in the app also notes are also saved locally and are synced to server as soon as the user comes online.

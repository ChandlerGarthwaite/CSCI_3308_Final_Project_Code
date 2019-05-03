
TAP STUDY

DESCRIPTION:
A platform that connects students together to study the same topics. Students will be able to post their study location and subject for others to see and join. This application lets students connect with others in various studies in order to help one another achieve better grades.

The way the app works is you first make an account or sign in, then you go to a designated study location on the CU campus to study. When you arrive, you go on to TapStudy and click the check in button in the menu bar. You will then enter your current location and subject you are studying, and click check in. Once you are checked in, the app will update how many people are studying the subject you are at the location you are at. To view how many people are studying at a location, simply click the pin on the map, and a menu will display how many people are studying each subject at that location. When you are done studying, you simply click check-out and that's it.


REPO STRUCTURE:
Our repo is divided into 6 folders. App contains all of our user authentication javascript code, and nothing in this folder needs to be altered for the app to run. Config contains all of our database linking code, so any change to database info is done in db.js, where you simply have to enter your postgres database info. Node_modules contains all of the software downloads that are required for the app to run. Resources contains all of our css style sheets, images, and page javascript code. Tables is a file that contains the PostgreSQL queries needed to create our back-end tables, which will need to be run in your database if you are deploying the app locally. The views folder contains all of the ejs files that create the pages of the app.


HOW TO RUN:
First you must have the postgres and node installed on the computer you are running this on. To run the app locally, all you have to do is clone the git repository, go into config/db.js and enter your database information. Then you will navigate to the repo in the command line, enter node server.js, then go in your browser and navigate to 'localhost:3000' and the app will be running.


TESTING:
To test if the log in and register features are working, empty the user tables and register. Upon sign up, you should see the info you entered in your database. If you see the info, the database is successfully inserting your info and user authentication will function correctly.

To test if the check in is working, you should see the counts of people studying increase upon checking in. If this is occurring, our check in feature is doing what it is supposed to.

To test edit profile, you should make a change and then check to see if the database has been updated. If the information is updated in the database, then the edit profile feature is working correctly.
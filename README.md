

Welcome!

This is the server repository for a handy mobile app to keep in your pocket(https://nutrition-journal.vercel.app/). The app should appeal to a wide community of people; from diabetics to bodybuilders. Whether the user's goal is weight loss, weight gain, or weight control my app is an essential tool. New users are able to create password protected accounts to archive their daily meals and macro-nutrient consumption. The app is streamlined for an easy user experience. No ads. No clutter.
#
#
This app was designed to be extremely mobile-friendly and is therefore most appropriate for use on a smartphone or tablet. With this caveat in mind, you may demo the app on any browser. Please enjoy! Everything should be fairly self-explainatory and easy to use. 
#
#
This is a fullstack JavaScript app. The client was built using React and the server was designed using Node. 
#
The client for this app is broken into several components, and make authorized fetch calls to the following URL 'https://gentle-brook-95294.herokuapp.com/api/'. The state is maintained and set in the App.js file, which is lowest common ancestor of the components that depend on its resources. User passwords are encrypted with bcrypt and stored as JWT on the server. Only the individual users can share credential info at their discretion. Authentication Tokens are held in local memory and cleared when the user signs out. This makes it possible to direct users to endpoints unique to their user-id. One user should not have access to another user's data without the appropriate login credentials.
#
Databases for the server where created and managed using PostgreSQL, and endpoints were fascillitated by the Express framework library. The current manifestation of this project depends on two database tables which directly reference eachother by a key relationship. 
#
#
#

#
--Please feel free to clone this git repository to your machine! Once the code has been cloned, just run the command 'npm install' to install the necessary dependancies/ libraries and then run 'npm start' to compile to code to your browser! Happy hacking!


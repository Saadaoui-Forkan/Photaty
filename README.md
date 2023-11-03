# Photaty
### A website for sharing photos
<img src="Photaty.jpg">

## Environment Variables
Create `.env` file in the backend folder and add the following
```
PORT= 4000
MONGO_URI= your mongodb uri
NODE_ENV= development
JWT_SECRET= your jwt secret key
CLIENT_DOMAIN= http://localhost:3000 
```

## Install Dependencies
**server**
```
cd server
npm install
```
**client**
```
cd client
npm install
```

## Run
**Run the backend**
```
cd server
npm run server
```

**Run the frontend**
```
cd client
npm start
```

##  Project Overview
1. Homepage:
* Display recently shared photos. These photos are visible to everyone, whether they are registered users or guests.
* Display photos as thumbnails with the option to click on an image to enlarge it.
* Like button for registered users with the number of likes displayed for everyone.
1. Login Page:
* This page contains a login form with input validation.
* In case of login failure for any reason, display an error message, such as incorrect password or invalid email.
* This page should not be displayed to users who are already logged in.
1. Register Page
* This page contains a registration form, including (name, email, password, confirm password) with input validation.
* After creating an account, the user should be automatically logged in.
* In case of account creation failure for any reason, display an error message, such as the email already being registered.
* This page should not be displayed to users who are already logged in.
1. Profile Page:
* Through this page, the user can browse the photos they have uploaded, with the ability to edit image information such as title and description.
* The user can delete any of the photos they have uploaded.
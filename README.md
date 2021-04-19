# Buy Nothing Back End

Inspired by Buy Nothing. A web application for giving things away for free or finding things for free. This is the back-end server for [buynothing.netlify.app](https://buynothing-frontend.netlify.app/main)

**Contributors**: Davee Sok, Ryan Geddes, Sarah Shatto, Jonathon Lee.

**Version**: 1.0.0

## Links and Resources

- [Back-End Server Url](https://buynothingbackend.herokuapp.com/)
- [Front-End Website](https://buynothing-frontend.netlify.app/main)
- [Front-End Repository](https://github.com/daveeS987/buy-nothing-frontend)

## Overview

This server performs crud operations on a listings collections and images collections. Certain routes can require authentication and authorization priveleges.

## Architecture

- The server uses an express framework and is deployed through heroku.
- MongoDB is used to store listings information and image urls.
- Actual images are not stored in our database, but a middleware in the image route, sends images to Cloudinary, and saves the url to our database.

## Dependencies and Tools

<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"/>
<img align="left" alt="Node.js" width="26px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ict.social%2Fimages%2F5728%2Fnodejs_logo.png&f=1&nofb=1"/>
<img align="left" alt="Express.js" width="26px" src="https://expressjs.com/images/express-facebook-share.png"/>
<img align="left" alt="Mongo" width="26px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-256%2Fmongodb-3-1175138.png&f=1&nofb=1"/>
<img  align="left" alt="Cloudinary" width="26px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcloudinary-res.cloudinary.com%2Fimage%2Fupload%2Fc_scale%2Cfl_attachment%2Cw_500%2Fv1%2Flogo%2Ffor_white_bg%2Fcloudinary_icon_for_white_bg.png&f=1&nofb=1"/>

</br>
<br>
<pre>
<b>Javascript ➡ NodeJS ➡ ExpressJS ➡ MongoDB ➡ Cloudinary </b>
</pre>

## Setup

- Clone down this Repo
- Install dependencies: `npm install`
- Create an account at https://cloudinary.com/ and get the following:
  - Cloud Name
  - API key
  - API secret
- Add the following into an .env file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buy-nothing-backend
SECRET= pick a secret word
CLOUD_NAME=  <<Get from Cloudinary Account>>
API_KEY= <<Get from Cloudinary Account>>
API_SECRET= <<Get from Cloudinary Account>>
```

- Run the server: `nodemon index.js`

## How to use this server:

The following routes are available:

```
api/v1/listings
api/v1/imghandler/images
api/v1/imghandler/upload

api/v2/listings
api/v2/imghandler/images
api/v2/imghandler/upload

```

Schema:

```
const listings = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required:true },
  imageUrl: { type: String, required:true },
  creatorUserName: { type: String, required:true },
  creatorUserId: { type: String, required:true },
  categories: { type: String, required:true },
  location:{ type: String, required:true },
  itemStatus: { type: Boolean, required:true },
  comments:[],
  commentors: [],
});
```

## Tests

<!-- - How do you run tests?
- Any tests of note?
- Describe any tests that you did not complete, skipped, etc -->

<!-- In the terminal enter: `npm test` -->

in progress...
no tests at this time

## UML

<!-- Link to an image of the UML for your application and response to events -->

<!-- Dev Notes

To see Heroku logs:

heroku logs --tail --app davee-auth-api-server

-->

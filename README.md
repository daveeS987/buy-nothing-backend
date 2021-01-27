# Buy Nothing Back End

### Author: Davee Sok, Ryan Geddes, Jonny Lee, Sarah Shatto

### Links and Resources

https://buynothingbackend.herokuapp.com/

- [ci/cd](https://github.com/401-javascript-final-DRJS/buy-nothing-backend/actions) (GitHub Actions)
- [back-end server url](https://buynothingbackend.herokuapp.com)
<!--
- [front-end application](http://xyz.com) (when applicable) -->

### Setup

#### .Env Requirements

Add the following into an .env file:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/authenticated-api-server
SECRET= pick a secret word
CLIENT_ID= get this from github
CLIENT_SECRET= get this from github
STATE= pick anything you want
TOKEN_SERVER=https://github.com/login/oauth/access_token
REDIRECT_URI=http://localhost:3000/oauth
REMOTE_API=https://api.github.com/user
```

#### How to initialize/run your application (where applicable)

- Clone repository
- Enter: `npm start`  
  or: `nodemon index.js` into command line

#### How to use this server:

The following routes are available:

```
/signup
/signin

api/v1/categories
api/v1/products
api/v1/todo
api/v1/listings

api/v2/categories
api/v2/products
api/v2/todo
api/v2/listings

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

#### Tests

<!-- - How do you run tests?
- Any tests of note?
- Describe any tests that you did not complete, skipped, etc -->

In the terminal enter: `npm test`

#### UML

<!-- Link to an image of the UML for your application and response to events -->

<!-- Dev Notes

To see Heroku logs:

heroku logs --tail --app davee-auth-api-server

-->

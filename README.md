# Buy Nothing Back End

### Author: Davee Sok, Ryan Geddes, Jonny Lee, Sarah Shatto

### Links and Resources

https://buynothingbackend.herokuapp.com/

- [ci/cd](https://github.com/401-javascript-final-DRJS/buy-nothing-backend/actions) (GitHub Actions)
- [back-end server url](https://buynothingbackend.herokuapp.com)

### Setup

#### .Env Requirements

Add the following into an .env file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buy-nothing-backend
SECRET= pick a secret word
CLOUD_NAME=  <<Get from Cloudinary Account>>
API_KEY= <<Get from Cloudinary Account>>
API_SECRET= <<Get from Cloudinary Account>>
```

#### How to initialize/run your application (where applicable)

- Clone repository
- Install dependencies: `npm install`
- Enter: `npm start`  
  or: `nodemon index.js` into command line

#### How to use this server:

The following routes are available:

```

api/v1/listings

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

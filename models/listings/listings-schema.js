'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


// const CommentSchema = mongoose.Schema({
//   userName: { type: String, required:true },
//   userId: { type: String, required:true },
//   text: { type: String, required:true },
// });

const listings = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required:true },
  imageUrl: { type: String, required:true },
  userName: { type: String, required:true },
  userId: { type: String, required:true },
  categories: { type: String, required:true },
  location:{ type: String, required:true },
  itemStatus: { type: Boolean, required:true },
  comments:[],
});



module.exports = mongoose.model('listings', listings);

//Arrays
//Mongoose supports arrays of SchemaTypes and arrays of subdocuments.
// Arrays of SchemaTypes are also called primitive arrays, and 
//arrays of subdocuments are also called document arrays.
//const ToySchema = new Schema({ name: String });
// const ToyBoxSchema = new Schema({
//   toys: [ToySchema],
//   buffers: [Buffer],
//   strings: [String],
//   numbers: [Number]
//   // ... etc
// });
//example array schema at docs:/
//https://mongoosejs.com/docs/schematypes.html#arrays


//https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
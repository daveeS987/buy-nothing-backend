'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/middleware/model-finder.js`);
const router = express.Router();
const bearer = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');

// Evaluate the model, dynamically
router.param('model', modelFinder.load);

// Models List
router.get('/models', (request, response) => {
  console.log('hi there');
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

// JSON Schema
router.get('/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});


router.get('/:model', handleGetAll);
router.post('/:model', bearer, permissions('create'), handlePost);
router.get('/:model', bearer, permissions('read'), handleGetAll);
router.get('/:model/:id', bearer, permissions('read'), handleGetOne);
router.put('/:model/:id', bearer, permissions('update'), handlePut);
router.delete('/:model/:id', bearer, permissions('delete'), handleDelete);
//route JUST for updated comments?
//router.put('/comments/')
//^^put request, on specific listing :id,
//modify $push {"comments": {userid: blah, text: blah}}

//syntax example:
// Contact.findByIdAndUpdate(
//   info._id,
//   {$push: {"messages": {title: title, msg: msg}}},
//   {safe: true, upsert: true, new : true},
//   function(err, model) {
//       console.log(err);
//   }
// );


async function handleGetAll(request, response, next) {
  try {
    let list = await request.model.get(request.query);
    const output = {
      count: list.length,
      results: list,
    };
    response.status(200).json(output);
  } catch(e) {
    next(e);
  }
}

async function handleGetOne(request, response, next) {
  try {
    let result = await request.model.get({ _id: request.params.id });
    response.status(200).json(result[0]);
  } catch(e) {
    next(e);
  }
}

async function handlePost(request, response, next) {
  try {
    let result = await request.model.create(request.body);
    response.status(200).json(result);
  } catch(e) {
    next(e);
  }
}

async function handlePut(request, response, next) {
  try {
    let result = await request.model.update(request.params.id, request.body);
    response.status(200).json(result);
  } catch(e) {
    next(e);
  }
}

async function handleDelete(request, response, next) {
  try {
    let result = await request.model.delete(request.params.id);
    response.status(200).json({});
  } catch(e) {
    next(e);
  }
}

module.exports = router;
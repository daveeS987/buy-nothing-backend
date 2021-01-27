'use strict';

const cwd = process.cwd();
const express = require('express');
const router = express.Router();
const modelFinder = require(`${cwd}/middleware/model-finder.js`);
const upload = require('../services/upload.js');
const Image = require('../models/images/images-model.js');
const image = new Image();

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

router.get('/imghandler/images', handleGetImages);
router.post('/imghandler/upload', upload.single('picture'), handleUpload);

router.get('/:model', handleGetAll);
router.post('/:model', handlePost);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);



async function handleGetImages (req, res, next){
  try {
    let images = await image.get();
    return res.status(200).json({ images, msg: 'image info fetched'    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'some error occured' });
  }
}

async function handleUpload(req, res, next){
  try {
    if (req.file && req.file.path) {
      const body = {
        // description: req.body.desc,
        url: req.file.path,
      };
      let createdImage = await image.create(body);

      return res.status(200).json({ msg: 'image successfully saved', createdImage });
    } else {
      console.log(req.file);
      return res.status(422).json({ error: 'invalid' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error occured when trying to upload' });
  }
}


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
    await request.model.delete(request.params.id);
    response.status(200).json({});
  } catch(e) {
    next(e);
  }
}

module.exports = router;

'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const myServer = supergoose(server.app);

// Helper Test Function
function propertiesMatch(obj, resultObj) {
  let allMatch = true;
  Object.keys(obj).forEach(key=> {
    if(obj[key] !== resultObj[key]) {allMatch = false;}
  });
  return allMatch;
}

describe('Proof of Life test', () => {
  it('Proof of life', () => {
    expect(true).toBeTruthy();
  });
});

describe('Test V1 Routes', () => {
  
  // Need this to be global to use in multiple test
  let obj3Id;

  it('POST /api/v1/todo adds an item to the DB and returns an object with that item', async() => {
    let obj1 = {
      text: 'text1',
      assignee: 'assignee1',
      complete: false,
      difficulty: 1,
    };
    let response = await myServer.post('/api/v1/todo').send(obj1);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeDefined();
    expect(propertiesMatch(obj1, response.body)).toEqual(true);
  });

  it('GET /api/v1/todo returns a list of todo items', async() => {
    let obj2 = {
      text: 'text2',
      assignee: 'assignee2',
      complete: false,
      difficulty: 2,
    };
    let added = await myServer.post('/api/v1/todo').send(obj2);
    let response = await myServer.get('/api/v1/todo');
    expect(response.body.count).toEqual(2);
    expect(response.status).toEqual(200);
  });

  it('GET /api/v1/todo/ID returns a single item by ID', async() => {
    let obj3 = {
      text: 'text3',
      assignee: 'assignee3',
      complete: false,
      difficulty: 3,
    };
    let added = await myServer.post('/api/v1/todo').send(obj3);
    obj3Id = added.body._id;
    let response = await myServer.get(`/api/v1/todo/${obj3Id}`);
    expect(propertiesMatch(obj3,response.body)).toEqual(true);
    expect(response.status).toEqual(200);
  });

  it('PUT /api/v1/todo/ID returns a single, updated item by ID', async() => {
    let obj4 = {
      text: 'updated',
      assignee: 'updated',
      complete: true,
      difficulty: 5,
    };
    let response = await myServer.put(`/api/v1/todo/${obj3Id}`).send(obj4);
    expect(propertiesMatch(obj4,response.body)).toEqual(true);
    expect(response.status).toEqual(200);
  });

  it('DELETE /api/v1/todo/ID returns an empty object and Subsequent get should result in nothing found', async () => {
    let deleted = await myServer.delete(`/api/v1/todo/${obj3Id}`);
    let checkDeleted = await myServer.get(`/api/v1/todo/${obj3Id}`);
    expect(deleted.body).toEqual({});
    expect(checkDeleted.body).toBeFalsy();
    expect(deleted.status).toEqual(200);
  });
});
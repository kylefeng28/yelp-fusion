'use strict';

const _yelp = require('./index');
const _test = require('tap').test;

const clientId = process.env.TEST_YELP_CLIENT_ID;
const clientSecret = process.env.TEST_YELP_CLIENT_SECRET;
let token = null;

// All tests depend on this test to get the access token
_test('Get access token', assert =>{
  _yelp.accessToken(clientId, clientSecret).then(response => {
    token = response.data.access_token;
    
    assert.true(response.data.access_token);
    assert.equals(response.data.token_type, 'Bearer');
    assert.true(response.data.expires_in);
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});

_test('Search', assert =>{
  const client = _yelp.client(token);
  client.search({
    term:'Four Barrel Coffee',
    location: 'san francisco, CA'
  }).then(response => {
    assert.true(response.data.businesses);
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});

_test('Phone search', assert =>{
  const client = _yelp.client(token);
  client.phoneSearch({
    phone:'+14157492060'
  }).then(response => {
    assert.equals(response.data.businesses[0].id, 'gary-danko-san-francisco');
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});

_test('Transaction search', assert =>{
  const client = _yelp.client(token);
  client.transactionSearch('delivery', {
    location:'san diego'
  }).then(response => {
    assert.true(response.data.businesses);
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});

_test('Business', assert =>{
  const client = _yelp.client(token);
  client.business('gary-danko-san-francisco').then(response => {
    assert.equals(response.data.name, 'Gary Danko');
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});

_test('Reviews', assert =>{
  const client = _yelp.client(token);
  client.reviews('gary-danko-san-francisco').then(response => {
    assert.true(response.data.reviews);
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});

_test('Autocomplete', assert =>{
  const client = _yelp.client(token);
  client.autocomplete({
    text:'pizza'
  }).then(response => {
    assert.true(response.data.terms);
    assert.end();
  }).catch(e =>{
    assert.fail(e);
  });
});


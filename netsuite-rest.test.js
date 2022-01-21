const dotenv = require('dotenv').config();
var NsApiWrapper = require('./netsuite-rest.js');

describe('Netsuite Rest Webservices', () => {
  jest.setTimeout(10000);
  let NsApi;
  let NsApiBaseUrl;

  beforeAll(async () => {
    NsApi = new NsApiWrapper({
      consumer_key: process.env.consumer_key,
      consumer_secret_key: process.env.consumer_secret_key,
      token: process.env.token,
      token_secret: process.env.token_secret,
      realm: process.env.realm
    });

    // with base_url
    NsApiBaseUrl = new NsApiWrapper({
      consumer_key: process.env.consumer_key,
      consumer_secret_key: process.env.consumer_secret_key,
      token: process.env.token,
      token_secret: process.env.token_secret,
      realm: process.env.realm,
      base_url: process.env.base_url
    });

  });

  afterAll(async () => {});

  it('should check env and NsApi', () => {
    expect(process.env.consumer_key).toBeDefined();
    expect(process.env.consumer_secret_key).toBeDefined();
    expect(process.env.token).toBeDefined();
    expect(process.env.token_secret).toBeDefined();
    expect(process.env.realm).toBeDefined();
    expect(NsApi).toBeDefined();
  });

  test('should make test request', () => {
    expect.assertions(1);
    return NsApi.request({
        method: "OPTIONS"
      })
      .then(response => expect(response.statusCode).toEqual(204))
      .catch(() => {
        console.log("Test request failed.")
      });
  });

  test('should make GET request - GET Customers', () => {
    expect.assertions(1);
    return NsApi.request({
        path: 'record/v1/customer/'
      })
      .then(response => expect(response.statusCode).toEqual(200))
      .catch(() => {
        console.log("GET request failed.")
      });
  });

  test('should make POST request - SuiteQL Query', () => {
    expect.assertions(1);
    return NsApi.request({
        path: 'query/v1/suiteql?limit=5',
        method: "POST",
        body: `{
                   "q": "SELECT id, companyName, email, dateCreated FROM customer WHERE dateCreated >= '01/01/2019' AND dateCreated < '01/01/2020'"
                }`
      })
      .then(response => expect(response.statusCode).toEqual(200))
      .catch(() => {
        console.log("POST request failed.")
      });
  });


  test('should work with base_url', () => {
    expect.assertions(2);
    expect(process.env.base_url).toBeDefined();
    return NsApiBaseUrl.request({
        method: "OPTIONS"
      })
      .then(response => expect(response.statusCode).toEqual(204))
      .catch(() => {
        console.log("Test request failed.")
      });
  });

  test('should work with additional headers', () => {
    expect.assertions(1);
    return NsApi.request({
        method: "OPTIONS",
        heads: {
          foo: 'foo'
        }
      })
      .then(response => expect(response.statusCode).toEqual(204))
      .catch(() => {
        console.log("Test request failed.")
      });
  });
});
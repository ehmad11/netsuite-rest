# # NetSuite - SuiteTalk REST Web Services

[![NPM](https://nodei.co/npm/netsuite-rest.png)](https://www.npmjs.com/package/netsuite-rest)

![Node.js CI](https://github.com/ehmad11/netsuite-rest/workflows/Node.js%20CI/badge.svg?branch=master) [![npm version](https://badge.fury.io/js/netsuite-rest.svg)](https://www.npmjs.com/package/netsuite-rest) [![Coverage Status](https://coveralls.io/repos/github/ehmad11/netsuite-rest/badge.svg?branch=master)](https://coveralls.io/github/ehmad11/netsuite-rest?branch=master) 

Make requests to SuiteTalk REST Web Services

# Installation

    npm i netsuite-rest

## Quick Start

	var NsApiWrapper = require('netsuite-rest');
	NsApi = new NsApiWrapper({
			consumer_key :  process.env.consumer_key,
			consumer_secret_key :  process.env.consumer_secret_key,
			token:  process.env.token,
			token_secret:  process.env.token_secret,
			realm :  process.env.realm
		});

### Sample Requests
Test Request

	NsApi.request({url: '*', method:"OPTIONS"})
	.then(response  =>  console.log(response) )
	.catch((err) => console.log(err) );

GET Request: 

	NsApi.request({url: 'record/v1/customer/'})
	.then(response  => console.log(response) )
	.catch((err) => console.log(err) );

SuiteQl is a subservice of the query service. Following is an example to execute SuiteQL queries:

	NsApi.request({
		url: 'query/v1/suiteql?limit=5', 
		method: "POST", 
		body: `{
			"q": "SELECT id, companyName, email, dateCreated FROM customer WHERE dateCreated >= '01/01/2019' AND dateCreated < '01/01/2020'"
		}`
	})
	.then(response => console.log(response) )
	.catch((err) => console.log(err) );

## Netsuite Rest API Browser

[REST API Browser](https://system.netsuite.com/help/helpcenter/en_US/APIs/REST_API_Browser/record/v1/2019.2/index.html) provides a visual overview of the structure and capabilities of the REST web services Record API. The data presented in the REST API Browser is based on OpenAPI 3.0 metadata.
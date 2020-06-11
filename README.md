# # NetSuite - SuiteTalk REST Web Services

[![NPM](https://nodei.co/npm/netsuite-rest.png)](https://www.npmjs.com/package/netsuite-rest)

![Node.js CI](https://github.com/ehmad11/netsuite-rest/workflows/Node.js%20CI/badge.svg?branch=master) [![npm version](https://badge.fury.io/js/netsuite-rest.svg)](https://www.npmjs.com/package/netsuite-rest) [![Coverage Status](https://coveralls.io/repos/github/ehmad11/netsuite-rest/badge.svg?branch=master)](https://coveralls.io/github/ehmad11/netsuite-rest?branch=master) 

Make requests to SuiteTalk REST Web Services

# Installation

    npm i netsuite-rest

## Quick Start

To set up TBA in Netsuite, see the help topic [Getting Started with Token-based Authentication](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_4247337262.html).

	var NsApiWrapper = require('netsuite-rest');
	NsApi = new NsApiWrapper({
		consumer_key: process.env.consumer_key,
		consumer_secret_key: process.env.consumer_secret_key,
		token: process.env.token,
		token_secret: process.env.token_secret,
		realm: process.env.realm
	});

## Sample Requests

All requests are [signed](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_1534941088.html).

#### Test Request

	NsApi.request({
        path: '*',
        method: "OPTIONS"
    })
    .then(response => console.log(response))
    .catch((err) => console.log(err));

#### GET Request: 

	NsApi.request({
        path: 'record/v1/customer/'
    })
    .then(response => response.data)
    .then(data => console.log(data.links))
    .catch((err) => console.log(err));

#### SuiteQl 

SuiteQl is a subservice of the query service. Following is an example to execute SuiteQL queries:

	NsApi.request({
        path: 'query/v1/suiteql?limit=5',
        method: "POST",
        body: `{
			"q": 
			"SELECT 
				id, companyName, email, dateCreated
             FROM customer WHERE 
                dateCreated >= '01/01/2019'
               	AND dateCreated < '01/01/2020'"
		}`
    })
    .then(response => console.log(response))
    .catch((err) => console.log(err));

## Response

Requests are returned with promise support (`.then(...)`). HTTP response codes other than 2xx will cause the promise to be rejected.

## Metadata

	NsApi.request({path: 'record/v1/metadata-catalog/'})

Record is the name of the service we are trying to access, v1 is the service version, and metadata-catalog is the sub-resource, that is, the record metadata. The response informs you through HATEOAS links about the possible mediaType flavor in which the response can be obtained.

## HATEOAS

You can navigate to the referenced resources without deeper knowledge of the system. A typical response contains "links" sections for each resource, which can be a sub-resource of a parent resource or any other referenced resource. You can use links to work with those resources.

## Netsuite Rest API Browser

[REST API Browser](https://system.netsuite.com/help/helpcenter/en_US/APIs/REST_API_Browser/record/v1/2019.2/index.html) provides a visual overview of the structure and capabilities of the REST web services Record API. The data presented in the REST API Browser is based on OpenAPI 3.0 metadata.
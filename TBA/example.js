var TBANetSuite = require('./tbanetsuite');
var fs          = require('fs');
var jsonFormat  = require('json-format');
var open        = require('mac-open');

// NetSuite account
var credentials = {
    accountId:      '<YOUR_ACCOUNT_ID>',
    consumerKey:    '<CONSUMER_KEY>',
    consumerSecret: '<CONSUMER_SECRET>',
    tokenKey:       '<TOKEN_ID>',
    tokenSecret:    '<TOKEN_SECRET>'
}

function createOpenFile(results, fileName) {

    var jsonObject = JSON.parse(results);

    fs.writeFile(fileName, jsonFormat(jsonObject), function(err) {
        if (err) {
            return console.log(err);
        }
        // Open the file
        open(fileName);
    });    
}

function catchError(err) {
    var errorObj;

    try {
        errorObj = JSON.parse(err.error);
    } catch(e) {
        console.log(err);
    } finally {
        console.log('Error:\n' + 
                    'Status Code: ' + err.statusCode + '\n' +
                    'Error Code: ' + errorObj.error.code + '\n' +
                    'Error Message: ' + errorObj.error.message);
    }
}

// Tests
var tbaTest = new TBANetSuite(credentials);

// RESTlet URL Make sure to use the correct domain, such as rest.na1, rest.na2
var RESTLET_URL = 'https://rest.netsuite.com/app/site/hosting/restlet.nl'; 

// Test GET
tbaTest.request(RESTLET_URL + '?script=customscript_in8_inventory_rl&deploy=1&location=1&subsidiary=5')
    .then(function(result) {
        createOpenFile(result, 'Results/results_get.json');
    })
    .catch(function (err) {
        catchError(err);
    });

// Test POST
var payload = { 'recordType': 'customer',
                'firstname': 'test',
                'lastname': 'test111'
              };

tbaTest.request(RESTLET_URL + '?script=customscript_in8_sync_rl&deploy=1', JSON.stringify(payload))
    .then(function(result) {
        createOpenFile(result, 'Results/results_post.json');
    })
    .catch(function (err) {
        catchError(err);
    });

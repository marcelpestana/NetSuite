const crypto = require('crypto');
const request = require('request-promise');
const OAuth = require('oauth-1.0a');

module.exports = function(credentials) {

    var token = {
        key: credentials.tokenKey,
        secret: credentials.tokenSecret    
    };
    
    var oauth = OAuth({
        consumer: {
            key: credentials.consumerKey,
            secret: credentials.consumerSecret
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto.createHmac('sha1', key).update(base_string).digest('base64');
        }
    });     

    this.request = function(url, payload, httpMethod) {

        var request_data = {
            url: url,
            method: httpMethod || payload ? 'POST' : 'GET',
            data: {}
        };
        
        var oauth_data = {
            oauth_consumer_key: oauth.consumer.public,
            oauth_nonce: oauth.getNonce(),
            oauth_signature_method: oauth.signature_method,
            oauth_timestamp: oauth.getTimeStamp(),
            oauth_version: '1.0',
            oauth_token: token.public
        };
        
        // Generate the header
        var headerWithRealm = oauth.toHeader(oauth.authorize(request_data, token));
        headerWithRealm.Authorization += ', realm="' + credentials.accountId + '"';
        
        // Setup the header
        var headers = {
            'User-Agent': 'TBA',
            'Authorization': headerWithRealm.Authorization,
            'content-type': 'application/json'
        };
        
        return request({
            url: url,
            method: request_data.method,
            body: payload,
            headers: headers
        });        
    };
}

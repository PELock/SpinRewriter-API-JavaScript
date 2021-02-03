/******************************************************************************
 *
 * Spin Rewriter API for JavaScript and Node.js (npm) example of how to check
 * the available quota for your account.
 *
 * Note: Spin Rewriter API server is using a 120-second timeout.
 * Client scripts should use a 150-second timeout to allow for HTTP connection
 * overhead.
 *
 * SDK Version    : v1.0
 * Language       : JavaScript (Node.js)
 * Dependencies   : spin-rewriter-api
 * Website        : https://www.spinrewriter.com/
 * Contact email  : info@spinrewriter.com
 *
 * JS SDK Author  : Bartosz Wójcik (https://www.pelock.com)
 *
 *****************************************************************************/

// Include the Spin Rewriter API SDK (3 different ways)

// Use direct name of the module from the NPM repository
// You need to install it with the following command:
// npm install spin-rewriter-api
//const SpinRewriterAPI = require('spin-rewriter-api');

// use import from your JS module
//import SpinRewriterAPI from "../index.js"

// use require from the pure JavaScript files and a local copy of Spin Rewriter SDK
const SpinRewriterAPI = require('../index.js');

//
// Spin Rewriter API settings - authentication:
//

// your Spin Rewriter email address goes here
let email_address = "test@example.com";

// your unique Spin Rewriter API key goes here
let api_key = "1ab234c#d5e67fg_h8ijklm?901n234";

// Authenticate yourself.
const spinrewriter_api = new SpinRewriterAPI(email_address, api_key);

// Make the actual API request and save the response as a native JSON object.
// The return value is a Promise object, so you can easily handle success and failure
spinrewriter_api.getQuota()
    .then(response => {
        console.log("Spin Rewriter API response");
        console.log(response);
    })
    .catch(error => {
        console.error("Spin Rewriter API error");
        console.error(error)
    });

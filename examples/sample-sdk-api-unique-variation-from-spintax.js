/******************************************************************************
 *
 * Spin Rewriter API for JavaScript and Node.js (npm) example of how to
 * generate unique variation from the provided spintax template.
 *
 * Note: Spin Rewriter API server is using a 120-second timeout.
 * Client scripts should use a 150-second timeout to allow for HTTP connection
 * overhead.
 *
 * SDK Version    : v1.1
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
import { SpinRewriterAPI } from "spin-rewriter-api";

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

// (optional) Sets whether Spin Rewriter should only use synonyms (where available) when generating spun text.
spinrewriter_api.setUseOnlySynonyms(false);

// (optional) Sets whether Spin Rewriter should intelligently randomize the order of paragraphs and lists when generating spun text.
spinrewriter_api.setReorderParagraphs(false);

// (optional) Sets whether Spin Rewriter should automatically enrich generated articles with headings, bullet points, etc.
spinrewriter_api.setAddHTMLMarkup(false);

// (optional) Sets whether Spin Rewriter should automatically convert line-breaks to HTML tags.
spinrewriter_api.setUseHTMLLinebreaks(false);

/*
 * IMPORTANT:
 *
 * When using the action 'unique_variation_from_spintax', your text
 * should already contain valid {first option|second option} spinning syntax.
 *
 * No additional processing is done on your text, Spin Rewriter simply
 * provides one of the unique variations of the given (already spun) text.
 */
let text = "John {will|will certainly} {book|make a reservation for} a {room|hotel suite}.";

// Make the actual API request and save the response as a native JSON object.
// The return value is a Promise object, so you can easily handle success and failure
spinrewriter_api.getUniqueVariationFromSpintax(text)
    .then(response => {
        console.log("Spin Rewriter API response");
        console.log(response);
    })
    .catch(error => {
        console.error("Spin Rewriter API error");
        console.error(error)
    });
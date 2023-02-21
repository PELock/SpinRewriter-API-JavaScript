/******************************************************************************
 *
 * Spin Rewriter API for JavaScript and Node.js (npm) example of how to
 * generate unique variation.
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

// your Spin Rewriter email address goes here
let email_address = "test@example.com";

// your unique Spin Rewriter API key goes here
let api_key = "1ab234c#d5e67fg_h8ijklm?901n234";

// Spin Rewriter API settings - authentication:
const spinrewriter_api = new SpinRewriterAPI(email_address, api_key);

/*
 * (optional) Set a list of protected terms.
 * You can use one of the following formats:
 * - protected terms are separated by the '\n' (newline) character
 * - protected terms are separated by commas (comma-separated list)
 * - protected terms are stored in a JS string [] array
 */
let protected_terms = "John, Douglas Adams, then";
//let protected_terms = "John\nDouglas\nAdams\nthen";
//let protected_terms =  [ "John", "Douglas", "Adams", "then" ];

spinrewriter_api.setProtectedTerms(protected_terms);

// (optional) Set whether the One-Click Rewrite process automatically protects Capitalized Words outside the article's title.
spinrewriter_api.setAutoProtectedTerms(false);

// (optional) Set the confidence level of the One-Click Rewrite process.
spinrewriter_api.setConfidenceLevel("medium");

// (optional) Set whether the One-Click Rewrite process uses nested spinning syntax (multi-level spinning) or not.
spinrewriter_api.setNestedSpintax(true);

// (optional) Set whether Spin Rewriter rewrites complete sentences on its own.
spinrewriter_api.setAutoSentences(false);

// (optional) Set whether Spin Rewriter rewrites entire paragraphs on its own.
spinrewriter_api.setAutoParagraphs(false);

// (optional) Set whether Spin Rewriter writes additional paragraphs on its own.
spinrewriter_api.setAutoNewParagraphs(false);

// (optional) Set whether Spin Rewriter changes the entire structure of phrases and sentences.
spinrewriter_api.setAutoSentenceTrees(false);

// (optional) Sets whether Spin Rewriter should only use synonyms (where available) when generating spun text.
spinrewriter_api.setUseOnlySynonyms(false);

// (optional) Sets whether Spin Rewriter should intelligently randomize the order of paragraphs and lists when generating spun text.
spinrewriter_api.setReorderParagraphs(false);

// (optional) Sets whether Spin Rewriter should automatically enrich generated articles with headings, bullet points, etc.
spinrewriter_api.setAddHTMLMarkup(false);

// (optional) Sets whether Spin Rewriter should automatically convert line-breaks to HTML tags.
spinrewriter_api.setUseHTMLLinebreaks(false);

// Make the actual API request and save the response as a native JSON object.
let text = "John will book a room. Then he will read a book by Douglas Adams.";

// The return value is a Promise object, so you can easily handle success and failure
spinrewriter_api.getUniqueVariation(text)
    .then(response => {
        console.log("Spin Rewriter API response");
        console.log(response);
    })
    .catch(error => {
        console.error("Spin Rewriter API error");
        console.error(error)
    });
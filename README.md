# Spin Rewriter - Article Rewriter with ENL Semantic Spinning (for JavaScript and Node.js)

The only article spinner that truly understands the meaning of your content.

With ENL technology, Spin Rewriter is the perfect tool for SEO specialists that need unique, human-quality content to rank higher on Google.

[![How to use Spin Rewriter Tutorial](https://img.youtube.com/vi/hIZgag6ChhA/0.jpg)](https://www.youtube.com/watch?v=hIZgag6ChhA)

## Why Spin Rewriter? Start ranking higher, for more keywords.

You already know that quality unique content does wonders for your Google rankings. You also know that such content takes ages to write — or it costs you an arm and two legs if you hire someone to write it for you.

Spin Rewriter saves you both time and money. It takes a single article and turns it into dozens of 100% unique, human-quality articles. All these unique articles will let you rank higher, and for more profitable keywords.

## What are the benefits of our API?

As a user, Spin Rewriter API allows you to use the ENL Semantic Spinning spinning technology inside other compatible software products.

This means that you can — for example — spin your articles using our amazing technology directly inside your favorite article distribution software.

You never have to load the Spin Rewriter website and interrupt your workflow by spinning your article here, and then pasting it to your article distribution software. You can use Spin Rewriter directly from compatible desktop software products, online services, WordPress plugins, etc.

As a developer, you can use the amazing Spin Rewriter technology inside your own application or service. Whenever you need to rewrite a block of text, simply send it to our servers and Spin Rewriter will do all the hard work for you. We developed our algorithms — you make the most of them!

## Installation for JavaScript (node.js)

The preferred way to install the library is through [npm](https://www.npmjs.com/).

Run:

```
npm install spin-rewriter-api
```

The package is available at https://www.npmjs.com/package/spin-rewriter-api

## Basic usage example

```javascript
/******************************************************************************
 *
 * Spin Rewriter API for JavaScript and Node.js (npm) basic usage example.
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
const SpinRewriterAPI = require('spin-rewriter-api');

// use import from your JS module
//import SpinRewriterAPI from "../index.js"

// use require from the pure JavaScript files and a local copy of Spin Rewriter SDK
//const SpinRewriterAPI = require('../index.js');

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
 * - protected terms are stored in a PHP array
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

// (optional) Set the desired spintax format to be used with the returned spun text.
spinrewriter_api.setSpintaxFormat("{|}");

// Make the actual API request and save the response as a native PHP array.
text = "John will book a room. Then he will read a book by Douglas Adams.";

// The return value is a Promise object, so you can easily handle success and failure
api_response = spinrewriter_api.getTextWithSpintax(text)
    .then(response => {
        console.log("Spin Rewriter API response");
        console.log(response);
    })
    .catch(error => {
        console.error("Spin Rewriter API error");
        console.error(error)
    });
```

## Need help, have some questions?

For more information visit our site https://www.spinrewriter.com/
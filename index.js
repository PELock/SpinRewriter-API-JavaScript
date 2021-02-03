/******************************************************************************
 *
 * Spin Rewriter API for JavaScript and Node.js (npm)
 *
 * The only article spinner that truly understands the meaning of your content.
 *
 * With ENL technology, Spin Rewriter is the perfect tool for SEO specialists
 * that need unique, human-quality content to rank higher on Google.
 *
 * Note: Spin Rewriter API server is using a 120-second timeout.
 * Client scripts should use a 150-second timeout to allow for HTTP connection
 * overhead.
 *
 * SDK Version    : v1.0
 * Language       : JavaScript (Node.js)
 * Dependencies   : form-data, node-fetch
 * Website        : https://www.spinrewriter.com/
 * Contact email  : info@spinrewriter.com
 *
 * JS SDK Author  : Bartosz Wójcik (https://www.pelock.com)
 *
 *****************************************************************************/

const FormData = require('form-data');
const fetch = require('node-fetch');

module.exports = class SpinRewriterAPI {

   /**
    * Spin Rewriter API constructor, complete with authentication.
    * @param {string} email_address
    * @param {string} api_key
    */
   constructor(email_address, api_key) {
       // make this an object (NOT an Array)
       this.data = {};
       this.data['email_address'] = email_address;
       this.data['api_key'] = api_key;
       this.api_url = "http://www.spinrewriter.com/action/api";
   }

    /**
     * Parse a boolean value encoded either as a boolean type, string of "true" / "false" or a number 0/1
     * @param {boolean|string|number} boolean_number_or_text
     * @param {boolean} convert_to_string_bool
     * @return {boolean|string} output boolean value in preferred format
     */
   parseBool(boolean_number_or_text, convert_to_string_bool = true) {
       let result = false;

       switch(typeof(boolean_number_or_text)) {
           case "string": result = boolean_number_or_text.toLowerCase() === "true"; break;
           case "boolean": result = boolean_number_or_text === true; break;
           case "number": result = Number(boolean_number_or_text) === 1; break;
       }

       if (convert_to_string_bool === true) {
           return result ? "true" : "false";
       }

       return result;
   }

   /**
    * Returns the API Quota (the number of made and remaining API calls for the 24-hour period).
    * @return {Promise}
    */
   getQuota() {
       this.data['action'] = "api_quota";
       return this.makeRequest();
   }

   /**
    * Returns the processed text with the {first option|second option} spinning syntax.
    * @param {string} text
    * @return {Promise}
    */
   getTextWithSpintax(text) {
       this.data['action'] = "text_with_spintax";
       this.data['text'] = text;
       return this.makeRequest();
   }

   /**
    * Returns one of the possible unique variations of the processed text.
    * @param {string} text
    * @return {Promise}
    */
   getUniqueVariation(text) {
       this.data['action'] = "unique_variation";
       this.data['text'] = text;
       return this.makeRequest();
   }

   /**
    * Returns one of the possible unique variations of given text that already contains valid spintax. No additional processing is done.
    * @param {string} text
    * @return {Promise}
    */
   getUniqueVariationFromSpintax(text) {
       this.data['action'] = "unique_variation_from_spintax";
       this.data['text'] = text;
       return this.makeRequest();
   }

   /**
    * Sets the list of protected keywords and key phrases.
    * @param {Array|string} protected_terms (array of words, comma separated list, newline separated list)
    * @return {boolean} boolean
    */
   setProtectedTerms(protected_terms) {
       this.data['protected_terms'] = "";

       if (Array.isArray(protected_terms)) {
           // array of words
           for (let protected_term of protected_terms) {
               protected_term = protected_term.trim();
               if ((typeof protected_term === "string") && (protected_term.length > 2)) {
                   this.data['protected_terms'] += protected_term + "\n";
               }
           }
           this.data['protected_terms'] = this.data['protected_terms'].trim();
           return true;
       } else if (protected_terms.includes(",") !== false) {
           // comma separated list
           let protected_terms_explode = protected_terms.split(",");
           for (let protected_term of protected_terms_explode) {
               protected_term = protected_term.trim();
               if (protected_term && protected_term.length > 2) {
                   this.data['protected_terms'] += protected_term + "\n";
               }
           }
           this.data['protected_terms'] = this.data['protected_terms'].trim();
           return true;
       } else if (protected_terms.trim().includes("\n") !== false) {
           // newline separated list (the officially supported format)
           protected_terms = protected_terms.trim();
           if (protected_terms.length > 0) {
               this.data['protected_terms'] = protected_terms;
               return true;
           } else {
               return false;
           }
       } else if (typeof(protected_terms) === "string" && protected_terms.trim() && protected_terms.trim().length > 2 && protected_terms.trim().length < 50) {
           // a single word or phrase (the officially supported format)
           this.data['protected_terms'] = protected_terms.trim();
           return true;
       } else {
           // invalid format
           return false;
       }
   }

   /**
    * Sets whether the One-Click Rewrite process automatically protects Capitalized Words outside the article's title.
    * @param {boolean|string|number} auto_protected_terms boolean
    * @return {boolean} boolean
    */
   setAutoProtectedTerms(auto_protected_terms) {
       this.data['auto_protected_terms'] = this.parseBool(auto_protected_terms);
       return true;
   }

   /**
    * Sets the confidence level of the One-Click Rewrite process.
    * @param {('low', 'medium', 'high')} confidence_level 
    * @return {boolean} boolean
    */
   setConfidenceLevel(confidence_level) {
       this.data['confidence_level'] = confidence_level;
       return true;
   }

   /**
    * Sets whether the One-Click Rewrite process uses nested spinning syntax (multi-level spinning) or not.
    * @param {boolean|string|number} nested_spintax boolean
    * @return {boolean} boolean
    */
   setNestedSpintax(nested_spintax) {
       this.data['nested_spintax'] = this.parseBool(nested_spintax);
       return true;
   }

   /**
    * Sets whether Spin Rewriter rewrites complete sentences on its own.
    * @param {boolean|string|number} auto_sentences boolean
    * @return {boolean} boolean
    */
   setAutoSentences(auto_sentences) {
       this.data['auto_sentences'] = this.parseBool(auto_sentences);
       return true;
   }

   /**
    * Sets whether Spin Rewriter rewrites entire paragraphs on its own.
    * @param {boolean|string|number} auto_paragraphs boolean
    * @return {boolean} boolean
    */
   setAutoParagraphs(auto_paragraphs) {
       this.data['auto_paragraphs'] = this.parseBool(auto_paragraphs);
       return true;
   }

   /**
    * Sets whether Spin Rewriter writes additional paragraphs on its own.
    * @param {boolean|string|number} auto_new_paragraphs boolean
    * @return {boolean} boolean
    */
   setAutoNewParagraphs(auto_new_paragraphs) {
       this.data['auto_new_paragraphs'] = this.parseBool(auto_new_paragraphs);
       return true;
   }

   /**
    * Sets whether Spin Rewriter changes the entire structure of phrases and sentences.
    * @param {boolean|string|number} auto_sentence_trees boolean
    * @return {boolean} boolean
    */
   setAutoSentenceTrees(auto_sentence_trees) {
       this.data['auto_sentence_trees'] = this.parseBool(auto_sentence_trees);
       return true;
   }

   /**
    * Sets whether Spin Rewriter should only use synonyms (where available) when generating spun text.
    * @param {boolean|string|number} use_only_synonyms
    * @return {boolean}
    */
   setUseOnlySynonyms(use_only_synonyms) {
       this.data['use_only_synonyms'] = this.parseBool(use_only_synonyms);
       return true;
   }

   /**
    * Sets whether Spin Rewriter should intelligently randomize the order of paragraphs and lists when generating spun text.
    * @param {boolean|string|number} reorder_paragraphs
    * @return {boolean}
    */
   setReorderParagraphs(reorder_paragraphs) {
       this.data['reorder_paragraphs'] = this.parseBool(reorder_paragraphs);
       return true;
   }

   /**
    * Sets whether Spin Rewriter should automatically enrich generated articles with headings, bullet points, etc.
    * @param {boolean|string|number} add_html_markup
    * @return {boolean}
    */
   setAddHTMLMarkup(add_html_markup) {
       this.data['add_html_markup'] = this.parseBool(add_html_markup);
       return true;
   }

   /**
    * Sets whether Spin Rewriter should automatically convert line-breaks to HTML tags.
    * @param {boolean|string|number} use_html_linebreaks
    * @return {boolean}
    */
   setUseHTMLLinebreaks(use_html_linebreaks) {
       this.data['use_html_linebreaks'] = this.parseBool(use_html_linebreaks);
       return true;
   }

   /**
    * Sets the desired spintax format to be used with the returned spun text.
    * @param {('{|}', '{~}', '[|]', '[spin]')} spintax_format ('{|}', '{~}', '[|]', '[spin]')
    * @return {boolean}
    */
   setSpintaxFormat(spintax_format) {
       this.data['spintax_format'] = spintax_format;
       return true;
   }

   /**
    * Sends a request to the Spin Rewriter API and return a Promise with JSON encoded response.
    * @return {Promise}
    */
   makeRequest() {

       // prepare a form to make a POST request
       const form = new FormData();

       // built the form entry
       for (let item in this.data) {
           if (this.data.hasOwnProperty(item)) {
               form.append(item, this.data[item]);
           }
       }

       // send the request and return a Promise (return JSON by default)
       return fetch(this.api_url, {
           method: 'POST',
           body: form,
           headers: form.getHeaders()
       })
       .then(response => response.json());
   }
}

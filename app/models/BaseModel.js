"use strict";

const request = require('co-request');
const parser = require('xml2json');

function Model(){
    this.cache = { en: {}, tc: {}, sc: {} };  // ex. en: { pubDate: '', text: '' }
    this.hasNewer = false;
    this.subscribers = {}; // chatId as keys, ex. {'someId': {locale: 'tc'}}

    this.name = '';
    this.uriMap = { };
};


/**
 * Override to specify different output formatter for different models
 */
Model.prototype.transformer = function(json){
    return JSON.stringify(json);
};

/**
 * Fetch feed from remote
 * @param {String} locale One of 'en', 'tc', 'sc'
 */
Model.prototype.fetch = function *(locale){
    console.log(`[Model](${this.name}) fetch: ${locale}`);

    // request from remote
    const uri = this.uriMap[locale];
    const result = yield request(uri);
    const json = parser.toJson(result.body, {object: true});

    // format output
    const ret = this.transformer(json);

    // update cache
    console.log(`[Model](${this.name}) update cache: ${locale}`);
    if(this.cache[locale].pubDate && this.cache[locale].pubDate !== ret.cache.pubDate) this.hasNewer = true;
    else this.hasNewer = false;

    this.cache[locale] = ret.cache;

    return ret.text;
};

module.exports = Model;

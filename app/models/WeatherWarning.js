"use strict";
/** @module WeatherWarning */

const request = require('co-request');
const parser = require('xml2json');
const cheerio = require('cheerio');

function Model(){

}

Model.cache = { en: {}, tc: {}, sc: {} };  // pubDate, text

Model.hasNewer = false;
Model.subscribers = {}; // chatId as keys, ex. {'someId': {locale: 'tc'}}

Model.uriMap = {
    en: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
    tc: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
    sc: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};

Model.fetch = function *(locale){
    console.log('[Model: WeatherWarning] fetch:', locale);

    const uri = Model.uriMap[locale];
    const result = yield request(uri);
    const json = parser.toJson(result.body, {object: true});

    const node = cheerio.load('<div>'+json.rss.channel.item.description.toString()+'</div>');
    const ret = node('div').text();

    // update cache
    if(Model.cache[locale].pubDate && Model.cache[locale].pubDate !== json.rss.channel.pubDate) Model.hasNewer = true;
    else Model.hasNewer = false;

    Model.cache[locale].pubDate = json.rss.channel.pubDate;
    Model.cache[locale].text = ret;

    return ret;
};

module.exports = Model;

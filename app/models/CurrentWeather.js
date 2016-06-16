"use strict";
/** @module CurrentWeather */

const request = require('co-request');
const parser = require('xml2json');
const cheerio = require('cheerio');

function Model(){

}

Model.uriMap = {
    en: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
    tc: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    sc: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};

Model.fetch = function *(locale){
    const uri = Model.uriMap[locale];
    const result = yield request(uri);
    const json = parser.toJson(result.body, {object: true});
    const node = cheerio.load('<div>'+json.rss.channel.item.description.toString()+'</div>');
    const ret = node('div').text();

    return ret;
};


module.exports = Model;

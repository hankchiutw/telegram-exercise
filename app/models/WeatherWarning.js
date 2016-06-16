"use strict";
/** @module WeatherWarning */

const cheerio = require('cheerio');
const BaseModel = require('./BaseModel');

let Model = new BaseModel();

Model.name = 'WeatherWarning';
Model.uriMap = {
    en: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml',
    tc: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml',
    sc: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml'
};


Model.transformer = function(json){
    let ret = {};
    const node = cheerio.load('<div>'+json.rss.channel.item.description.toString()+'</div>');
    ret.text = node('div').text();
    ret.cache = {
        pubDate: json.rss.channel.item.pubDate,
        text: ret.text
    };

    return ret;
};

module.exports = Model;

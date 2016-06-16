"use strict";
/** @module CurrentWeather */

const cheerio = require('cheerio');
const BaseModel = require('./BaseModel');

let Model = new BaseModel();

Model.name = 'CurrentWeather';
Model.uriMap = {
    en: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml',
    tc: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml',
    sc: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml'
};

Model.transformer = function(json){
    let ret = {};
    const node = cheerio.load('<div>'+json.rss.channel.item.description.toString()+'</div>');
    ret.text = node('div p').text();
    ret.cache = {
        pubDate: json.rss.channel.item.guid.pubDate,
        text: ret.text
    };

    return ret;
};

module.exports = Model;

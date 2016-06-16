'use strict';

const validTopics = require('config/config').validTopics;
const currentLocaleMap = require('config/config').currentLocaleMap;


const co = require('co');

/**
 * Expose
 */

module.exports = function(app){
    console.log('Config controller: hko:');

    const prefix = 'hko';
    const map = {
        topics,
        locale,
        tellmeCurrentWeather: _builder(_tellme, 'CurrentWeather'),
        tellmeWeatherWarning: _builder(_tellme, 'WeatherWarning'),
        subscribeCurrentWeather: _builder(_subscribe, 'CurrentWeather'),
        unsubscribeCurrentWeather: _builder(_unsubscribe, 'CurrentWeather'),
        subscribeWeatherWarning: _builder(_subscribe, 'WeatherWarning'),
        unsubscribeWeatherWarning: _builder(_unsubscribe, 'WeatherWarning')
    };

    /**
     * Define controllers with prefix
     */
    Object.keys(map).forEach(function(name){
        app.controller(`${prefix}.${name}`, co.wrap(map[name]));
    });

};


/**
 * Implements
 */

function *topics($){
    $.sendMessage(`Supported topics: ${validTopics}`);
}

function *locale($){
    if(['en', 'tc', 'sc'].indexOf($.args) < 0) currentLocaleMap[$.chatId] = 'en';
    else currentLocaleMap[$.chatId] = $.args;

    $.sendMessage('Locale was set to '+ currentLocaleMap[$.chatId]);
}

/**
 * Private implements
 */

/**
 * Build a controller as an ES6 genderator
 */
function _builder(callback, modelName){
    return function*($){
        $.args = modelName;
        yield callback($);
    };
}

function *_tellme($){
    console.log('[tellme] topic:', $.args);
    if(validTopics.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const locale = currentLocaleMap[$.chatId];
    const TopicModel = require('app/models/'+$.args);
    //const ret = yield TopicModel.fetch(locale);
    const ret = TopicModel.cache[locale].text;

    $.sendMessage(ret);
}

function *_subscribe($){
    console.log('[subscribe] topic:', $.args);
    if(validTopics.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const locale = currentLocaleMap[$.chatId];
    const TopicModel = require('app/models/'+$.args);

    TopicModel.subscribers[$.chatId] = {locale};

    $.sendMessage('ok');
}

function *_unsubscribe($){
    console.log('[unsubscribe] topic:', $.args);
    if(validTopics.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const TopicModel = require('app/models/'+$.args);

    delete TopicModel.subscribers[$.chatId];

    $.sendMessage('ok');
}


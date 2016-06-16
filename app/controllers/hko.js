'use strict';

const TOPICS = require('config/config').topics;
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
        tellmeCurrentWeather,
        tellmeWeatherWarning,
        subscribeWeatherWarning,
        unsubscribeWeatherWarning
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
    $.sendMessage(`Supported topics: ${TOPICS}`);
}

function *locale($){
    if(['en', 'tc', 'sc'].indexOf($.args) < 0) currentLocaleMap[$.chatId] = 'en';
    else currentLocaleMap[$.chatId] = $.args;

    $.sendMessage('Locale was set to '+ currentLocaleMap[$.chatId]);
}

function *tellmeCurrentWeather($){
    $.args = 'CurrentWeather';
    yield _tellme($);
}

function *tellmeWeatherWarning($){
    $.args = 'WeatherWarning';
    yield _tellme($);
}

function *subscribeWeatherWarning($){
    $.args = 'WeatherWarning';
    yield _subscribe($);
}

function *unsubscribeWeatherWarning($){
    $.args = 'WeatherWarning';
    yield _unsubscribe($);
}

/**
 * Private implements
 */

function *_tellme($){
    console.log('[tellme] topic:', $.args);
    if(TOPICS.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const locale = currentLocaleMap[$.chatId];
    const TopicModel = require('app/models/'+$.args);
    const ret = yield TopicModel.fetch(locale);

    $.sendMessage(ret);
}

function *_subscribe($){
    console.log('[subscribe] topic:', $.args);
    if(TOPICS.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const locale = currentLocaleMap[$.chatId];
    const TopicModel = require('app/models/'+$.args);

    TopicModel.subscribers[$.chatId] = {locale};

    $.sendMessage('ok');
}

function *_unsubscribe($){
    console.log('[unsubscribe] topic:', $.args);
    if(TOPICS.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const TopicModel = require('app/models/'+$.args);

    delete TopicModel.subscribers[$.chatId];

    $.sendMessage('ok');
}


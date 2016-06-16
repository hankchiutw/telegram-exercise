'use strict';

const TOPICS = require('config/config').topics;
const currentLocaleMap = require('config/config').currentLocaleMap;

const co = require('co');

/**
 * Expose
 */

module.exports = function(app){
    const prefix = 'hko';
    const map = {
        topics,
        tellme
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

function *tellme($){
    console.log('[tellme] topic:', $.args);
    if(TOPICS.indexOf($.args) < 0) return $.sendMessage('topic not existed.');
    if(!currentLocaleMap[$.chatId]) currentLocaleMap[$.chatId] = 'en';

    const locale = currentLocaleMap[$.chatId];
    const TopicModel = require('app/models/'+$.args);
    const ret = yield TopicModel.fetch(locale);

    console.log('[tellme] ret:', ret);
    $.sendMessage(ret);
}

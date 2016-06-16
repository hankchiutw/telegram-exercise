'use strict';

const co = require('co');
const TOPICS = require('config/config').topics;

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
    console.log('tellme:', $.args);

    $.sendMessage($.args+' feed:');
}

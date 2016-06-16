'use strict';

const co = require('co');

/**
 * Expose
 */

module.exports = function(app){
    const prefix = 'hko';
    const map = {
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

function *tellme($){
    console.log('tellme:', $.args);

    $.sendMessage($.args+' feed:');
}

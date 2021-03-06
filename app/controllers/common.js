'use strict';

const co = require('co');

/**
 * Expose
 */

module.exports = function(app){
    const prefix = 'common';
    const map = {
        start
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

function *start($){
    $.sendMessage('ok!');
}

'use strict';

const co = require('co');

/**
 * Expose
 */

module.exports = function(app){
    const map = {
        start
    };

    /**
     * Define controllers with prefix
     */
    Object.keys(map).forEach(function(name){
        app.controller(`common.${name}`, co.wrap(map[name]));
    });

};


/**
 * Implements
 */

function *start($){
    $.sendMessage('ok!');
}

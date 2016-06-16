'use strict';

/**
 * Expose
 */

module.exports = function(app){
    require('app/controllers/hko')(app);

    const map = {
        'hko.topics': ['topics'],
        'hko.tellme': ['tellme']
    };

    /**
     * Define routes
     */
    Object.keys(map).forEach(function(name){
        app.router.when(map[name], name);
    });


};

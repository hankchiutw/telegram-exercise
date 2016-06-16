'use strict';

/**
 * Expose
 */

module.exports = function(app){
    require('app/controllers/common')(app);

    const map = {
        'common.start': ['start']
    };

    /**
     * Define routes
     */
    Object.keys(map).forEach(function(name){
        app.router.when(map[name], name);
    });


};

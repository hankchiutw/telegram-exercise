'use strict';

module.exports = function(app){
    console.log('Config routes ...');

    require('app/routes/common')(app);
    require('app/routes/hko')(app);

};

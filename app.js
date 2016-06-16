'use strict';

/**
 * Boot service
 */

try{
    const botToken = require('config/config').botToken;
    const app = require('telegram-node-bot')(botToken);
    require('config/routes')(app);

    console.log('Service started.');
}catch(e){
    console.log('Fail to start service:', e);
}

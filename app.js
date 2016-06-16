'use strict';

/**
 * Boot service
 */

try{
    const app = require('telegram-node-bot')('209018537:AAELoaUjVWGbk9MPUys63xLlHX2-X_pWi0Q');
    require('config/routes')(app);

    console.log('Service started.');
}catch(e){
    console.log('Fail to start service:', e);
}

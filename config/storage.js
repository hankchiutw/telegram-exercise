'use strict';

const co = require('co');
const syncPeriod = require('config/config').syncPeriod;

module.exports = function (app){
    console.log('Config storage ...');

    const WeatherWarning = require('app/models/WeatherWarning');

    // periodically sync local storage
    setInterval(co.wrap(function *(){
        console.log('[storage] sync remote:');
        yield WeatherWarning.fetch('en');

        if(!WeatherWarning.hasNewer) return;

        yield WeatherWarning.fetch('tc');
        yield WeatherWarning.fetch('sc');

        // inform subscribers
        Object.keys(WeatherWarning.subscribers).forEach(function(id){
            const locale = WeatherWarning.subscribers[id].locale;
            app.sendMessage(id, '[!!!NEW WARNING!!!]\n'+WeatherWarning.cache[locale].text);
        });

    }), syncPeriod);

};

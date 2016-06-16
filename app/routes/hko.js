'use strict';

/**
 * Expose
 */

module.exports = function(app){
    require('app/controllers/hko')(app);

    const map = {
        'hko.topics': ['topics'],
        'hko.locale': ['locale'],
        'hko.tellmeCurrentWeather': ['tellme c', 'tellme current', 'tellme CurrentWeather'],
        'hko.tellmeWeatherWarning': ['tellme w', 'tellme warning', 'tellme WeatherWarning'],
        'hko.subscribeCurrentWeather': ['sub c', 'subscribe c', 'subscribe current', 'subscribe CurrentWeather'],
        'hko.unsubscribeCurrentWeather': ['unsub c', 'unsubscribe c', 'unsubscribe current', 'unsubscribe CurrentWeather'],
        'hko.subscribeWeatherWarning': ['sub w', 'subscribe w', 'subscribe warning', 'subscribe WeatherWarning'],
        'hko.unsubscribeWeatherWarning': ['unsub w', 'unsubscribe w', 'unsubscribe warning', 'unsubscribe WeatherWarning']
    };

    /**
     * Define routes
     */
    Object.keys(map).forEach(function(name){
        app.router.when(map[name], name);
    });


};

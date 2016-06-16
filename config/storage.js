'use strict';

const co = require('co');
const validTopics = require('config/config').validTopics;
const syncPeriod = require('config/config').syncPeriod;

module.exports = function (app){
    console.log('Config storage ...');

    validTopics.forEach(function(topic){
        const TopicModel = require('app/models/'+topic);

        // periodically sync local storage
        setInterval(co.wrap(function *(){
            console.log('[storage] sync remote:');
            yield TopicModel.fetch('en');

            if(!TopicModel.hasNewer) return;

            yield TopicModel.fetch('tc');
            yield TopicModel.fetch('sc');

            // inform subscribers
            const ids = Object.keys(TopicModel.subscribers);
            ids.forEach(function(id){
                const locale = TopicModel.subscribers[id].locale;
                app.sendMessage(id, `[!!!NEW UPDATE!!!](${TopicModel.name})\n${TopicModel.cache[locale].text}`);
            });

        }), syncPeriod);
    });

};

'use strict';

module.exports = {
    botToken: '209018537:AAELoaUjVWGbk9MPUys63xLlHX2-X_pWi0Q',
    hkoFeeds: {
        en: [
            { name: 'current', uri: 'http://rss.weather.gov.hk/rss/CurrentWeather.xml' },
            { name: 'warning', uri: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml' }
        ],
        tc: [
            { name: 'current', uri: 'http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml' },
            { name: 'warning', uri: 'http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml' }
        ],
        sc: [
            { name: 'current', uri: 'http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml' },
            { name: 'warning', uri: 'http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml' }
        ]
    },
    topics: ['current', 'warning']
};

# telegram-exercise
Simple [telegram bot](https://core.telegram.org/bots). Check [telegram.me/hankchiu_bot](http://telegram.me/hankchiu_bot).

### Folder structure
```sh
.
├── app
│   ├── controllers # controller implementations
│   ├── models      # data model for xml feeds
│   └── routes      # routes definitions
├── app.js          # boot and run testing
├── config          # app configurations
│   ├── config.js   # constants
│   ├── routes.js   # load app/routes/*
│   └── storage.js  # init in-memory cache
├── ecosystem.json  # deployment settings
├── package.json
└── README.md       # this file
```

### Features
- Start daemon with [pm2](http://pm2.keymetrics.io/).
- ES6 syntax(generator, class, etc).
- In-memory cache.
- Polling remote for cache.(every 10 minutes by default)

### Basic commands
- start
   * Check system alive, should return `ok!`

- topics
   * List current supported topics

- locale
   * Set data locale for the current chat
   * Use as `locale en`, `locale tc`, `locale sc`
   * Equal to `locale en` if no argument provided 

- tellme c
   * Query for current weather
   * All alias: `tellme current`, `tellme CurrentWeather`

- tellme w
   * Query for weather warning
   * All alias: `tellme warning`, `tellme WeatherWarning`

- sub c
   * Subscribe current weather
   * All alias: `subscribe c`, `subscribe current`, `subscribe CurrentWeather`

- unsub c
   * Unsubscribe current weather
   * All alias: `unsubscribe c`, `unsubscribe current`, `unsubscribe CurrentWeather`

- sub w
   * Subscribe weather warning
   * All alias: `subscribe w`, `subscribe warning`, `subscribe WeatherWarning`

- unsub w
   * Unsubscribe weather warning
   * All alias: `unsubscribe w`, `unsubscribe warning`, `unsubscribe WeatherWarning`


### Pre-install

```sh
npm install -g mocha pm2
```

### Install

```sh
npm install
```

### Development

```sh
npm start # start service daemon
npm stop # stop service daemon
npm run log # show local process logs
```

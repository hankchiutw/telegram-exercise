# telegram-exercise
Simple [telegram bot](https://core.telegram.org/bots)

### Folder structure
```sh
.
├── app
│   ├── controllers # controller implementations
│   ├── models
│   └── routes      # routes definitions
├── app.js          # boot and run testing
├── config          # app configurations
│   └── routes.js   # load app/routes/*
├── ecosystem.json  # deployment settings
├── package.json
├── README.md       # this file
└── test-runner.js  # where testing scripts invoked from
```

### Features
- Start daemon with [pm2](http://pm2.keymetrics.io/).
- ES6 syntax(generator, class, etc).

### Pre-install

```sh
npm install -g mocha pm2 concurrently
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

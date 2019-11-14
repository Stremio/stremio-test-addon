const { addonBuilder: AddonBuilder, serveHTTP: startHttpServer } = require('stremio-addon-sdk');
const DbContext = require('./db');

const argv = process.argv.slice(2);
const port = argv.includes('--port') ?
    parseInt(argv[argv.indexOf('--port') + 1])
    :
    7000;
const maxRequestDelay = argv.includes('--delay') ?
    parseInt(argv[argv.indexOf('--delay') + 1])
    :
    1000;
const errorChance = argv.includes('--error') ?
    parseFloat(argv[argv.indexOf('--error') + 1])
    :
    0;

const addon = new AddonBuilder({
    id: 'com.stremio.ptaddon',
    name: 'Stremio\'s pen test addon',
    description: 'Addon for pentest the stremio addons system',
    version: '1.0.0',
    resources: ['meta', 'stream'],
    types: ['movie', 'series'],
    catalogs: [],
    idPrefixes: ['pt']
});
const db = new DbContext(port);
const createPenTestHandler = (handler) => {
    return (args) => {
        return handler(args).then((response) => {
            return new Promise((resolve, reject) => {
                const delay = Math.random() * maxRequestDelay;
                setTimeout(() => {
                    const error = Math.random() <= errorChance;
                    if (error) {
                        reject();
                    } else {
                        resolve(response);
                    }
                }, delay);
            });
        });
    };
};

addon.defineMetaHandler(createPenTestHandler(({ type, id }) => {
    const meta = db.getMeta(type, id);
    if (meta) {
        return Promise.resolve({ meta });
    }

    return Promise.reject();
}));

addon.defineStreamHandler(createPenTestHandler(({ type, id }) => {
    const streams = db.getStreams(type, id);
    if (streams) {
        return Promise.resolve({ streams });
    }

    return Promise.reject();
}));

startHttpServer(addon.getInterface(), {
    port,
    static: '/assets'
});

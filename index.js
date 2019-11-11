const { addonBuilder: AddonBuilder, serveHTTP: startHttpServer } = require('stremio-addon-sdk');
const { getMeta, getStreams } = require('./db');

const addon = new AddonBuilder({
    id: 'com.stremio.ptaddon',
    name: 'Stremio\'s pen test addon',
    description: 'Addon for pentest the stremio addons system',
    version: '1.0.0',
    resources: ['meta', 'stream'],
    types: ['movie'],
    catalogs: [],
    idPrefixes: ['pt']
});

const argv = process.argv.slice(2);
const maxRequestDelay = argv.includes('--delay') ?
    parseInt(argv[argv.indexOf('--delay') + 1])
    :
    1000;
const errorChance = argv.includes('--error') ?
    parseFloat(argv[argv.indexOf('--error') + 1])
    :
    0;
const getHandlerResult = (response) => {
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
};

addon.defineMetaHandler(({ type, id }) => {
    const meta = getMeta(type, id);
    if (meta) {
        return getHandlerResult({ meta });
    }

    return Promise.reject();
});

addon.defineStreamHandler(({ type, id }) => {
    const streams = getStreams(type, id);
    if (streams) {
        return getHandlerResult({ streams });
    }

    return Promise.reject();
});

for (const port of [7000, 7001, 7002, 7003, 7004]) {
    startHttpServer(addon.getInterface(), {
        port,
        static: '/assets'
    });
}

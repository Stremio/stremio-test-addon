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

addon.defineMetaHandler(({ type, id }) => {
    const meta = getMeta(type, id);
    if (meta) {
        return Promise.resolve({ meta });
    }

    return Promise.resolve({ meta: {} });
});

addon.defineStreamHandler(({ type, id }) => {
    const streams = getStreams(type, id);
    if (streams) {
        return Promise.resolve({ streams });
    }

    return Promise.resolve({ streams: [] });
});

for (const port of [7000, 7001, 7002, 7003, 7004]) {
    startHttpServer(addon.getInterface(), {
        port,
        static: '/assets'
    });
}

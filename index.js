const { addonBuilder: AddonBuilder, serveHTTP } = require('stremio-addon-sdk');
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

serveHTTP(addon.getInterface(), {
    port: 7000,
    static: '/assets'
});

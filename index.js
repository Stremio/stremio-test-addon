const { addonBuilder: AddonBuilder, serveHTTP } = require('stremio-addon-sdk');
const { getMeta, getStreams } = require('./db');

const addon = new AddonBuilder({
    id: 'com.stellarscript.ptstremio',
    version: '1.0.0',
    name: 'Nikola\'s pen test addon',
    resources: ['meta', 'stream'],
    types: ['movie'],
    catalogs: [],
    idPrefixes: ['npt']
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

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
    resources: ['catalog', 'meta', 'stream'],
    types: ['movie', 'series'],
    idPrefixes: ['pt'],
    catalogs: [
        {
            type: 'movie',
            id: 'test',
            name: 'MovieTestCatalog',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: Array(30).fill(null).map((_, index) => `genre_${index}`),
                    optionsLimit: 3
                },
                {
                    name: 'year',
                    isRequired: false,
                    options: Array(10).fill(null).map((_, index) => `${1990 + index}`),
                    optionsLimit: 1
                },
                {
                    name: 'imdb rating',
                    isRequired: false,
                    options: Array(10).fill(null).map((_, index) => `${index} - ${1 + index}`),
                    optionsLimit: 2
                },
                {
                    name: 'first letter',
                    isRequired: false,
                    options: Array(26).fill(null).map((_, index) => String.fromCharCode(97 + index)),
                    optionsLimit: 1
                },
                {
                    name: 'language',
                    isRequired: false,
                    options: ['english', 'bulgarian'],
                    optionsLimit: 1
                },
                {
                    name: 'skip',
                    isRequired: false,
                    optionsLimit: 1
                },
                {
                    name: 'search',
                    isRequired: false,
                    optionsLimit: 1
                }
            ]
        }
    ]
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

addon.defineCatalogHandler(createPenTestHandler(({ type, id, extra }) => {
    const metas = db.getMetasByType(type)
        .slice(0, 1)
        .map((meta) => {
            meta.description += JSON.stringify({ type, id, extra });
            return meta;
        })
        .concat(Array(99).fill(null))
        .map((_, __, metas) => metas[0]);
    return Promise.resolve({ metas });
}));

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

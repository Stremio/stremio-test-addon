const { addonBuilder: AddonBuilder, serveHTTP: startHttpServer } = require('stremio-addon-sdk');
const faker = require('faker');
const DbContext = require('./db');

const PORT = parseInt(process.env.PORT || 7000);
const DELAY = parseFloat(process.env.DELAY || 0);
const ERROR = parseFloat(process.env.ERROR || 0);

const genres = Array(30).fill(null).map(() => faker.lorem.word());
const years = Array(15).fill(null).map((_, index) => `${2020 - index}`);
const countries = Array(20).fill(null).map(() => faker.address.country());

const addon = new AddonBuilder({
    id: 'com.stremio.test',
    name: 'Stremio\'s test addon',
    description: 'Addon for testing the stremio clients',
    version: '1.0.0',
    resources: ['catalog', 'meta', 'stream'],
    types: ['movie', 'series'],
    idPrefixes: ['test:'],
    catalogs: [
        {
            id: 'test-catalog',
            type: 'movie',
            name: 'Test Catalog',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: genres,
                    optionsLimit: 3
                },
                {
                    name: 'year',
                    isRequired: false,
                    options: years,
                    optionsLimit: 1
                },
                {
                    name: 'country',
                    isRequired: false,
                    options: countries,
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
        },
        {
            id: 'test-catalog',
            type: 'series',
            name: 'Test Catalog',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: genres,
                    optionsLimit: 3
                },
                {
                    name: 'year',
                    isRequired: false,
                    options: years,
                    optionsLimit: 1
                },
                {
                    name: 'country',
                    isRequired: false,
                    options: countries,
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
const db = new DbContext(PORT);
const createTestHandler = (handler) => {
    return (args) => {
        return handler(args).then((response) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() < ERROR) {
                        reject();
                    } else {
                        resolve(response);
                    }
                }, DELAY);
            });
        });
    };
};

addon.defineCatalogHandler(createTestHandler(({ type, id, extra }) => {
    const metas = db.getMetasByType(type)
        .slice(0, 1)
        .map((meta) => {
            meta.description += JSON.stringify({ type, id, extra });
            return meta;
        })
        .concat(Array(parseInt(extra.skip) > 500 ? 9 : 99).fill(null))
        .map((_, index, metas) => ({ ...metas[0], id: `${metas[0].id}.${index}`, name: `${metas[0].name} ${index}` }));
    return Promise.resolve({
        [id === 'last-videos' ? 'metasDetailed' : 'metas']: metas
    });
}));

addon.defineMetaHandler(createTestHandler(({ type, id }) => {
    const meta = db.getMeta(type, id.slice(0, 3));
    if (meta) {
        return Promise.resolve({ meta });
    }

    return Promise.reject();
}));

addon.defineStreamHandler(createTestHandler(({ type, id }) => {
    const streams = db.getStreams(type, id);
    if (streams) {
        return Promise.resolve({ streams });
    }

    return Promise.reject();
}));

startHttpServer(addon.getInterface(), {
    port: PORT,
    static: '/assets'
});

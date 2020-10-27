const { addonBuilder: AddonBuilder, serveHTTP: startHttpServer } = require('stremio-addon-sdk');
const faker = require('faker');

const PORT = parseInt(process.env.PORT || 7000);
const DELAY = parseFloat(process.env.DELAY || 0);
const ERROR = parseFloat(process.env.ERROR || 0);
const HOST = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : 'http://localhost';

const ID_PREFIX = 'test:';
const STREAM_SOURCES = [
    { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { ytId: 'YE7VzlLtp-4' },
    { externalUrl: 'https://www.youtube.com/watch?v=YE7VzlLtp-4' },
    { infoHash: 'f84b51f0d2c3455ab5dabb6643b4340234cd036e' }
];

const pick = (items) => {
    return items[Math.floor(Math.random() * items.length)];
};

const genres = () => {
    return Array(30).fill(null).map(() => faker.lorem.word());
};

const years = () => {
    return Array(15).fill(null).map((_, index) => `${2020 - index}`);
};

const countries = () => {
    return Array(20).fill(null).map(() => faker.address.country());
};

const subtitles = () => ({
    id: `${ID_PREFIX}${faker.random.number()}`,
    lang: 'eng',
    url: `${HOST}/assets/subtitles.vtt`
});

const stream = () => ({
    ...pick(STREAM_SOURCES),
    title: pick([null, faker.name.title()]),
    thumbnail: pick([null, faker.image.image()]),
    subtitles: pick([[], [subtitles()]])
});

const video = (season, episode) => ({
    id: `${ID_PREFIX}${faker.random.number()}`,
    season,
    episode,
    title: faker.name.title(),
    released: pick([null, faker.date.past(), faker.date.future()]),
    overview: pick([null, faker.lorem.paragraph(), faker.lorem.paragraphs()]),
    thumbnail: pick([null, faker.image.image()]),
    streams: pick([[], [stream(), stream(), stream(), stream()]]),
    trailerStreams: pick([[], [stream()]]),
});

const internalLink = (category) => {
    const name = faker.name.findName();
    return {
        name,
        category,
        url: `stremio:///search?q=${name}`
    };
};

const externalLink = (name, category) => ({
    name,
    category,
    url: faker.internet.url()
});

const metaItem = (type) => ({
    id: `${ID_PREFIX}${faker.random.number()}`,
    type,
    name: faker.name.title(),
    poster: pick([null, faker.image.image()]),
    background: pick([null, faker.image.image()]),
    logo: pick([null, faker.image.image()]),
    description: pick([null, faker.lorem.paragraph(), faker.lorem.paragraphs()]),
    releaseInfo: pick([null, faker.date.past().getFullYear().toString() + '-']),
    runtime: pick([null, faker.random.number() + 'min']),
    released: pick([null, faker.date.past()]),
    posterShape: pick([null, 'poster', 'square', 'landscape', 'invalid']),
    videos: pick([[], [video(1, 1), video(1, 2), video(1, 3), video(2, 1), video(2, 2), video(2, 3), video(5, 1), video(5, 2), video(5, 3)]]),
    links: pick([[], [externalLink('Share me', 'share'), externalLink('16 / 10', 'imdb'), ...Array(5).fill(null).map(() => internalLink('director')), ...Array(5).fill(null).map(() => internalLink('cast'))]]),
    trailerStreams: pick([[], [stream()]]),
    behaviorHints: {
        defaultVideoId: type === 'movie' ? `${ID_PREFIX}${faker.random.number()}` : null,
        hasScheduledVideos: type === 'series'
    }
});

const addon = new AddonBuilder({
    id: 'com.stremio.test',
    name: 'Stremio\'s test addon',
    description: 'Addon for testing the stremio clients',
    version: '1.0.0',
    resources: ['catalog', 'meta', 'stream'],
    types: ['movie', 'series'],
    idPrefixes: [ID_PREFIX],
    catalogs: [
        {
            id: 'test-catalog',
            type: 'movie',
            name: 'Test Catalog',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: genres(),
                    optionsLimit: 3
                },
                {
                    name: 'year',
                    isRequired: false,
                    options: years(),
                    optionsLimit: 1
                },
                {
                    name: 'country',
                    isRequired: false,
                    options: countries(),
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
                    options: genres(),
                    optionsLimit: 3
                },
                {
                    name: 'year',
                    isRequired: false,
                    options: years(),
                    optionsLimit: 1
                },
                {
                    name: 'country',
                    isRequired: false,
                    options: countries(),
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
            id: 'last-videos',
            type: 'movie',
            name: 'Last videos',
            extra: [
                {
                    name: 'lastVideosIds',
                    isRequired: true,
                    optionsLimit: 500
                }
            ]
        },
        {
            id: 'last-videos',
            type: 'series',
            name: 'Last videos',
            extra: [
                {
                    name: 'lastVideosIds',
                    isRequired: true,
                    optionsLimit: 500
                }
            ]
        }
    ]
});

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
    const skip = parseInt(extra.skip || 0);
    const metas = Array(skip < 300 ? 100 : skip === 300 ? 50 : 0)
        .fill(null)
        .map(() => metaItem(type));
    return Promise.resolve({ [id === 'last-videos' ? 'metasDetailed' : 'metas']: metas });
}));

addon.defineMetaHandler(createTestHandler(({ type, id }) => {
    return Promise.resolve({ meta: { ...metaItem(type), id } });
}));

addon.defineStreamHandler(createTestHandler(() => {
    return Promise.resolve({ streams: pick([[], [stream(), stream(), stream(), stream()]]) });
}));

startHttpServer(addon.getInterface(), {
    port: PORT,
    static: '/assets'
});

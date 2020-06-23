const pullAllMetas = (port) => ({
    "st1": {
        "id": "st1",
        "type": "movie",
        "name": `Test movie 1 ${port}`,
        "poster": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "background": `http://127.0.0.1:${port}/assets/background.png`,
        "logo": `http://127.0.0.1:${port}/assets/logo.png`,
        "description": `Test movie 1 description ${port}`,
        "releaseInfo": "2019-",
        "runtime": "12 min",
        "released": "2019-11-08T07:57:48.271Z",
        "posterShape": "square",
        "behaviorHints": {
            "defaultVideoId": "st1v1"
        },
        "links": [
            {
                "name": "Squirrel",
                "category": "actors",
                "url": "stremio:///search?q=Squirrel"
            },
            {
                "name": "Big Bunny",
                "category": "actors",
                "url": "stremio:///search?q=Big%20Bunny"
            },
            {
                "name": "Sacha Goedegebure",
                "category": "directors",
                "url": "stremio:///search?q=Sacha%20Goedegebure"
            },
            {
                "name": "Sacha Goedegebure",
                "category": "writers",
                "url": "stremio:///search?q=Sacha%20Goedegebure"
            },
            {
                "name": "6.5 / 10",
                "category": "imdb",
                "url": "tt1254207"
            },
            {
                "name": "Share",
                "category": "share",
                "url": "https://peach.blender.org/"
            },
            {
                "name": "Official website",
                "category": "other",
                "url": "https://peach.blender.org/"
            },
            {
                "name": "Intro",
                "category": "other",
                "url": "stremio:///intro"
            }
        ],
        "videoIds": ["st1v1", "st1v2", "st1v3"],
        "trailerId": "st1t1",
    },
    "st2": {
        "id": "st2",
        "type": "series",
        "name": `Test series 2 ${port}`,
        "poster": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "background": `http://127.0.0.1:${port}/assets/background.png`,
        "logo": `http://127.0.0.1:${port}/assets/logo.png`,
        "description": `Test series 2 description ${port}`,
        "releaseInfo": "2017-",
        "runtime": "19 min",
        "released": "2019-11-08T07:57:48.271Z",
        "posterShape": "poster",
        "videoIds": ["st2v1", "st2v2", "st2v3"],
    }
});

const pullAllVideos = (port) => ({
    "st1v1": {
        "id": "st1v1",
        "title": `Test movie 1 video 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Test movie 1 video 1 overview ${port}`,
        "streamIds": ["st1v1s1"]
    },
    "st1v2": {
        "id": "st1v2",
        "title": `Test movie 1 video 2 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/non-existing-thumbnail.jpg`,
        "released": "3333-11-08T07:57:48.271Z",
        "overview": `Test movie 1 video 2 (broken thumbnail) ${port}`,
        "streamIds": ["st1v2s1"]
    },
    "st1v3": {
        "id": "st1v3",
        "title": `Test movie 1 video 3 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Test movie 1 video 3 (no thumbnail) ${port}`,
        "streamIds": ["st1v3s1"]
    },
    "st2v1": {
        "id": "st2v1",
        "title": `Test series 2 video 1 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Test series 2 video 1 ${port}`,
        "season": 1,
        "episode": 1,
        "streamIds": ["st2v1s1"]
    },
    "st2v2": {
        "id": "st2v2",
        "title": `Test series 2 video 2 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Test series 2 video 2 ${port}`,
        "season": 2,
        "episode": 1,
        "streamIds": ["st2v2s1"]
    },
    "st2v3": {
        "id": "st2v3",
        "title": `Test series 2 video 3 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Test series 2 video 3 ${port}`,
        "season": 3,
        "episode": 1,
        "streamIds": ["st2v3s1"]
    }
});

const pullAllStreams = (port) => ({
    "st1v1s1": {
        "id": "st1v1s1",
        "title": `Test movie 1 video 1 stream 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`,
        "subtitles": [{
            id: "asd1",
            lang: "eng",
            url: `http://127.0.0.1:${port}/assets/subtitles.vtt`
        }]
    },
    "st1v2s1": {
        "id": "st1v2s1",
        "title": `Test movie 1 video 2 stream 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "st1v3s1": {
        "id": "st1v3s1",
        "title": `Test movie 1 video 3 stream 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "st2v1s1": {
        "id": "st2v1s1",
        "title": `Test series 2 video 1 stream 1 ${port}`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "st2v2s1": {
        "id": "st2v2s1",
        "title": `Test series 2 video 2 stream 1 ${port}`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "st2v3s1": {
        "id": "st2v3s1",
        "title": `Test series 2 video 3 stream 1 ${port}`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "st1t1": {
        "id": "st1t1",
        "title": `Test movie 1 trailer 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    }
});

function DbContext(port) {
    const self = this;

    const getMetasByType = (type) => {
        const metas = pullAllMetas(port);
        return Object.values(metas)
            .filter((meta) => meta.type === type)
            .map(({ id }) => getMeta(type, id));
    };

    const getMeta = (type, metaId) => {
        const metas = pullAllMetas(port);
        const videos = pullAllVideos(port);
        const streams = pullAllStreams(port);
        const meta = Object.values(metas).find((meta) => {
            return meta.id === metaId && meta.type === type;
        });
        if (meta) {
            meta.videos = meta.videoIds.map((videoId) => {
                const video = videos[videoId];
                video.streams = video.streamIds.map((streamId) => streams[streamId]);
                delete video.streamIds;
                return video;
            });
            meta.trailer = streams[meta.trailerId];
            delete meta.videoIds;
            delete meta.trailerId;
        }

        return meta;
    };

    const getStreams = (type, videoId) => {
        const metas = pullAllMetas(port);
        const videos = pullAllVideos(port);
        const streams = pullAllStreams(port);
        const meta = Object.values(metas).some((meta) => {
            return meta.type === type && meta.videoIds.includes(videoId);
        });
        if (meta) {
            return videos[videoId].streamIds.map((streamId) => {
                return streams[streamId];
            });
        }

        return [];
    };

    self.getMetasByType = getMetasByType;
    self.getMeta = getMeta;
    self.getStreams = getStreams;
};

module.exports = DbContext;

const pullAllMetas = (port) => ({
    "pt1": {
        "id": "pt1",
        "type": "movie",
        "name": `Pen test movie 1 ${port}`,
        "poster": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "background": `http://127.0.0.1:${port}/assets/background.png`,
        "logo": `http://127.0.0.1:${port}/assets/logo.png`,
        "description": `Pen test movie 1 description ${port}`,
        "releaseInfo": "2019-",
        "runtime": "12 min",
        "released": "2019-11-08T07:57:48.271Z",
        "posterShape": "square",
        "externalUrls": [
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
                "url": "https://www.imdb.com/title/tt1254207"
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
            }
        ],
        "videoIds": ["pt1v1", "pt1v2", "pt1v3"],
        "trailerId": "pt1t1",
    },
    "pt2": {
        "id": "pt2",
        "type": "series",
        "name": `Pen test series 2 ${port}`,
        "poster": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "background": `http://127.0.0.1:${port}/assets/background.png`,
        "logo": `http://127.0.0.1:${port}/assets/logo.png`,
        "description": `Pen test series 2 description ${port}`,
        "releaseInfo": "2017-",
        "runtime": "19 min",
        "released": "2019-11-08T07:57:48.271Z",
        "posterShape": "poster",
        "videoIds": ["pt2v1", "pt2v2", "pt2v3"],
    }
});

const pullAllVideos = (port) => ({
    "pt1v1": {
        "id": "pt1v1",
        "title": `Pen test movie 1 video 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Pen test movie 1 video 1 overview ${port}`,
        "streamIds": ["pt1v1s1"]
    },
    "pt1v2": {
        "id": "pt1v2",
        "title": `Pen test movie 1 video 2 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/non-existing-thumbnail.jpg`,
        "released": "3333-11-08T07:57:48.271Z",
        "overview": `Pen test movie 1 video 2 (broken thumbnail) ${port}`,
        "streamIds": ["pt1v2s1"]
    },
    "pt1v3": {
        "id": "pt1v3",
        "title": `Pen test movie 1 video 3 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Pen test movie 1 video 3 (no thumbnail) ${port}`,
        "streamIds": ["pt1v3s1"]
    },
    "pt2v1": {
        "id": "pt2v1",
        "title": `Pen test series 2 video 1 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Pen test series 2 video 1 ${port}`,
        "season": 1,
        "episode": 1,
        "streamIds": ["pt2v1s1"]
    },
    "pt2v2": {
        "id": "pt2v2",
        "title": `Pen test series 2 video 2 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Pen test series 2 video 2 ${port}`,
        "season": 2,
        "episode": 1,
        "streamIds": ["pt2v2s1"]
    },
    "pt2v3": {
        "id": "pt2v3",
        "title": `Pen test series 2 video 3 ${port}`,
        "released": "2019-11-08T07:57:48.271Z",
        "overview": `Pen test series 2 video 3 ${port}`,
        "season": 3,
        "episode": 1,
        "streamIds": ["pt2v3s1"]
    }
});

const pullAllStreams = (port) => ({
    "pt1v1s1": {
        "id": "pt1v1s1",
        "title": `Pen test movie 1 video 1 stream 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "pt1v2s1": {
        "id": "pt1v2s1",
        "title": `Pen test movie 1 video 2 stream 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "pt1v3s1": {
        "id": "pt1v3s1",
        "title": `Pen test movie 1 video 3 stream 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "pt2v1s1": {
        "id": "pt2v1s1",
        "title": `Pen test series 2 video 1 stream 1 ${port}`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "pt2v2s1": {
        "id": "pt2v2s1",
        "title": `Pen test series 2 video 2 stream 1 ${port}`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "pt2v3s1": {
        "id": "pt2v3s1",
        "title": `Pen test series 2 video 3 stream 1 ${port}`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    },
    "pt1t1": {
        "id": "pt1t1",
        "title": `Pen test movie 1 trailer 1 ${port}`,
        "thumbnail": `http://127.0.0.1:${port}/assets/poster.jpg`,
        "url": `http://127.0.0.1:${port}/assets/video.mp4`
    }
});

function DbContext(port) {
    const self = this;

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

    self.getMeta = getMeta;
    self.getStreams = getStreams;
};

module.exports = DbContext;

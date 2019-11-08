const getAllMetas = () => ({
    "npt1": {
        "id": "npt1",
        "type": "movie",
        "name": "Pen test movie 1",
        "poster": "http://127.0.0.1:7000/assets/poster.jpg",
        "background": "http://127.0.0.1:7000/assets/background.png",
        "logo": "http://127.0.0.1:7000/assets/logo.png",
        "description": "Pen test movie 1 description",
        "release_info": "2019-",
        "runtime": "10:00",
        "released": "2019-11-08T07:57:48.271Z",
        "imdb_rating": "8.0",
        "poster_shape": "square",
        "videoIds": ["npt1v1"],
        "external_urls": [],
        "trailerId": "npt1t1"
    }
});

const getAllVideos = () => ({
    "npt1v1": {
        "id": "npt1v1",
        "name": "Pen test movie 1 video 1",
        "poster": "http://127.0.0.1:7000/assets/poster.jpg",
        "released": "2019-11-08T07:57:48.271Z",
        "description": "Pen test movie 1 video 1 description",
        "streamIds": ["npt1v1s1"]
    }
});

const getAllStreams = () => ({
    "npt1v1s1": {
        "id": "npt1v1s1",
        "name": "Pen test movie 1 video 1 stream 1",
        "poster": "http://127.0.0.1:7000/assets/poster.jpg",
        "url": "http://127.0.0.1:7000/assets/video.mp4"
    },
    "npt1t1": {
        "id": "npt1t1",
        "name": "Pen test movie 1 trailer 1",
        "poster": "http://127.0.0.1:7000/assets/poster.jpg",
        "url": "http://127.0.0.1:7000/assets/video.mp4"
    }
});

const getMeta = (type, metaId) => {
    const metas = getAllMetas();
    const videos = getAllVideos();
    const streams = getAllStreams();
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
    const metas = getAllMetas();
    const videos = getAllVideos();
    const streams = getAllStreams();
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

module.exports = {
    getMeta,
    getStreams
};

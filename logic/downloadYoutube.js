const fs = require('fs');
const ytdl = require('ytdl-core');
const config = require('../config.json');
const ffmpeg = require('fluent-ffmpeg')
const logger = require('../logger');

module.exports = async function(videoId) {
    const title = await getTitle(videoId);

    return new Promise((resolve, reject) => {
        const url = `http://www.youtube.com/watch?v=${videoId}`;
    
        const outputPath = `${config.downloadFolder}${title}.mp3`;
        const reader = ytdl(url, { filter: 'audioonly' })
        ffmpeg(reader)
            .format("mp3")
            .audioBitrate(128)
            .on('end', function() {
                logger.debug(`Finished processing file '${outputPath}'`);
                resolve(outputPath);
            })
            .on('error', function(err, stdout, stderr) {
                logger.error('Error: ' + err.message);
                reject(err);
            })
            .save(outputPath)
    });
}

function getTitle(videoId) {
    return new Promise(function (resolve, reject) {
        ytdl.getInfo(videoId, function(err, info) {
            if (err) reject(err);
            resolve(info.title);
        });
    });
}
"use strict";

const request = require('request-promise-native');
const config = require('../config.json')

module.exports = async function(query) {
    const apiKey = config.googleApiKey;
    const cleanQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${config.maxResults}&type=video&q=${cleanQuery}&key=${apiKey}`;
    const response = await request(url);
    const data = JSON.parse(response);
    return data.items;
};

  
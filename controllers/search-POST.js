"use strict";
const database = require('../database')
const logger = require('../logger')
const searchYoutube = require('../logic/searchYoutube')

module.exports = async function(req, res) {
    const search = req.body["search"];
    if (!search) {
        res.status(400).send("Invalid input")
        return;
    }

    const items = await searchYoutube(search);

    res.render('results', { items });
}
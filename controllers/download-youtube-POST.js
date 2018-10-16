"use strict";
const downloadYoutube = require('../logic/downloadYoutube')

module.exports = async function(req, res) {
    const id = req.params.id;
    await downloadYoutube(id);
    return res.redirect('/');
};
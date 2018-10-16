"use strict";

module.exports = async function(req, res) {
    return res.render('download-yt', { id: req.params.id })
};
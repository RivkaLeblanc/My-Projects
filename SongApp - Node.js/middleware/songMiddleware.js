function checkSongExists(req, res, next) {
    const Song = require('../models/songModel');
    Song.findById(req.params.id)
        .then(song => {
            if (!song) {
                return res.status(404).send('Song not found');
            }
            req.song = song;
            next();
        })
        .catch(err => {
            res.status(500).send('Error finding song');
        });
}

module.exports = { checkSongExists };   
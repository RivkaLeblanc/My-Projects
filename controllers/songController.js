const Song = require("../models/songModel");

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        const isAdmin = req.user && req.user.role === 'admin';
        res.render('songs', { songs, isAdmin }); 
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addSong = async (req,res) => {
    try{
        const { song_name, artist, lyrics, about, youtube_link, picture } = req.body;
        const newSong = new Song({song_name,artist,lyrics,about,youtube_link,picture});
        await newSong.save();
        res.redirect('/songs');
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAddSong = (req, res) => {
    res.render('add-song');
};

exports.getSongById = async (req, res) => {
    const song = req.song;
    const isAdmin = req.user && req.user.role === 'admin';
    res.render('songDetails', { song, isAdmin });
};

exports.deleteSong = async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.redirect('/songs');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEditSong = async (req, res) => {
    const song = req.song;
    res.render('edit-song', { song });
};

exports.updateSong = async (req, res) => {
    try {
        const { song_name, artist, lyrics, about, youtube_link, picture } = req.body;
        const song = req.song;
        song.song_name = song_name;
        song.artist = artist;
        song.lyrics = lyrics;
        song.about = about;
        song.youtube_link = youtube_link;
        song.picture = picture;
        await song.save();
        res.redirect(`/songs/${song._id}`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
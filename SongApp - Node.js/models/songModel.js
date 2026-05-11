 const mongoose = require('mongoose');
const songShema = new mongoose.Schema({
    song_name: {type:String,required:true},
    artist: {type:String,required:true},
    lyrics: {type:String,required:true},
    about: {type:String,required:true},
    youtube_link: {type:String,required:true},
    picture:{type:String,required:true}

}); 
module.exports = mongoose.model ('Song',songShema);
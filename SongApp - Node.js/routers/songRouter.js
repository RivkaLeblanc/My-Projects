const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const {protect, isAdmin } = require('../middleware/authMiddleware');
const {checkSongExists} = require('../middleware/songMiddleware');

router.get('/', protect, songController.getAllSongs);
router.get('/addSong', songController.getAddSong);
router.post('/addSong',protect, isAdmin, songController.addSong);
router.get('/edit/:id', protect, isAdmin, checkSongExists, songController.getEditSong);
router.post('/edit/:id', protect, isAdmin, checkSongExists, songController.updateSong);
router.get('/delete/:id',protect,isAdmin, songController.deleteSong);
router.get('/:id', protect, checkSongExists, songController.getSongById);



module.exports = router;
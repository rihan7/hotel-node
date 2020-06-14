const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Room = require('../model/room');
const { isLogin } = require('../utility/middleware');
const RoomDataHandler = require('../utility/roomDataHandler')

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
  const rooms = await Room.find().exec();
  if (req.xhr) {
    res.status(200).json(rooms);
  } else {
    res.render('home', { rooms });
  }
});

router.get('/room', isLogin, (req, res, next) => {
  res.render('room');
})

router.post('/room', isLogin, upload.array('images'), async (req, res, next) => {
  try {
    const data = new RoomDataHandler(req.body, req.files).dataModify();
    await new Room(data).save();
    res.redirect('/')
  } catch (error) {
    next(error)
  }
});

router.get('/room/:id', isLogin, async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).exec();
    res.render('room-edit', { room });
  } catch (error) {
    next(error)
  }
});

router.put('/room/:id', isLogin, upload.array('images'), async (req, res, next) => {
  try {
    const data = new RoomDataHandler(req.body, req.files);
    const room = await Room.findOneAndUpdate({ _id: req.params.id }, data.dataModify())
    if (req.files.length > 0) {
      data.filesDelete(room.images)
    }
    res.redirect('/room/' + req.params.id);
  } catch (error) {
    next(error)
  }
});

router.delete('/room/:id', isLogin, async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  new RoomDataHandler().filesDelete(room.images)
  res.redirect('/')
});

module.exports = router;

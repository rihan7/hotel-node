const mongoose = require('mongoose');

const data = require('./data');
const Room = require('../model/room');
const imagesArry = [
   'http://localhost:3000/uploads\\details-1.jpeg',
   'http://localhost:3000/uploads\\details-2.jpeg',
   'http://localhost:3000/uploads\\details-3.jpeg',
   'http://localhost:3000/uploads\\details-4.jpeg'];

// mongoose.connect('mongodb://localhost:27017/hotel', 
mongoose.connect('mongodb+srv://taher:taher.db@cluster0-o7f5u.mongodb.net/hotel',
   { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => { console.log('Database Connected') })
   .catch(error => { console.log(error) });

const seeding = async () => {
   await Room.collection.drop();
   for (let i = 0; i < data.length; i++) {
      let images = [...imagesArry];
      images.unshift(`http://localhost:3000/uploads\\room-${i + 1}.jpeg`);
      data[i].images = images;
      await new Room(data[i]).save()
   }
   exit();
}

const exit = () => {
   mongoose.disconnect();
   console.log('disconnect')
}

seeding();

const fs = require('fs');
const { ErrorHandler } = require('./errors');

class RoomDataHandler {
   constructor(data, files) {
      this.data = data;
      this.files = files;
   }

   dataModify = () => {
      this.data.extras = Array.isArray(this.data.extras) ? this.data.extras.filter(ex => ex !== '') : [];
      if (this.files.length > 0) {
         this.data.images = this.files.map(image => 'http://localhost:3000/' + image.path);
      }
      return this.data;
   }

   filesDelete = async (preFile) => {
      preFile.forEach(image => {
         let path = image.split('3000/')[1];
         fs.unlinkSync(path);
      })
      // fs.unlinkSync('uploads/images-1592073310858.jpg')
   }

}


module.exports = RoomDataHandler;
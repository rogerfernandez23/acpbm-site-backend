const multer = require('multer');
const { v4 } = require('uuid');
const { resolve, extname } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', 'temp'),
        filename: (req, file, callback) => {
            return callback(null, v4() + extname(file.originalname));
        }
    })
};


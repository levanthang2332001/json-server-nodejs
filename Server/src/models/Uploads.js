const  path  = require('path');
const { model } = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    // DESTINATION OF THE FILE
    destination: function(req, file, cb) {
        cb(null,'./src/Images');
    },

    // FILENAME OF THE FILE
    filename: function(req, file, cb) {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5241288, files: 1,
    },
    fileFilter: function(req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const minTypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(minTypes && extname) {
            return cb(null, true);
        }
        cb('Error: Images Only!');
    }
}).single('image');

module.exports = { upload };

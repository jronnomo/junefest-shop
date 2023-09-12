import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetypes = filetypes.test(file.mimetypes);
  if (extname && mimetypes) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
}

const upload = multer({
  storage,
  checkFileType,
});

//@desc Upload a product image
//@route POST /api/upload
//@access Private/Admin
router.post('/', upload.single('image'), (req, res) => {
  res.send({ message: 'Image uploaded', image: `/${req.file.path}` });
});

export default router;
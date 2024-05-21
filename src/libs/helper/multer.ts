import { diskStorage } from 'multer';
import { extname } from 'path';
const crypto = require('crypto');

export const storage = diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cd) {
    cd(
      null,
      file.fieldname + '-' + crypto.randomUUID() + extname(file.originalname),
    );
  },
});

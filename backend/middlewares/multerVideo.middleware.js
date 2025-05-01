import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/videos"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


export const uploadVideo = multer({
  storage: storage,
  limits: {
    fileSize: 60 * 1024 * 1024, 
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["video/mp4", "video/mov", "video/avi", "video/mkv"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(new Error("Invalid file type. Only MP4, MOV, AVI, MKV allowed."), false);
    }
  },
});

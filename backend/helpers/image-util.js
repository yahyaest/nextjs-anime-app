import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/images/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  )
    callback(null, true);
  else {
    callback(new Error("Image type should be jpeg or png"), false);
  }
};

export const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

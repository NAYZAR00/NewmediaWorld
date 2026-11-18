const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

const uploadDirectory = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensionsByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
      callback(null, `${crypto.randomUUID()}${extensionsByMimeType[file.mimetype]}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!extensionsByMimeType[file.mimetype]) {
      callback(new Error("Choose a JPG, PNG, or WebP image."));
      return;
    }
    callback(null, true);
  },
});

module.exports = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    const status = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
      ? 413
      : 400;
    res.status(status).json({ message: error.message });
  });
};

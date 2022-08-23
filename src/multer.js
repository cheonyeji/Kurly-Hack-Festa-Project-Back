import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./config/s3_config";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "kurlyvery-img-s3",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

const uploadImage = upload.single("img_uri");

export default uploadImage;

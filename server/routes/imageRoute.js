const {
  createImg,
  allImages,
  imageId,
  userImages,
  userImageId,
  removeImg,
  editImg,
  likeImg,
  unLikeImg
} = require("../controllers/imgCtr");
const protect = require("../middleware/AuthMiddleware");
const { check } = require("express-validator");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

// @route     api/images/new_image
// @method    Post
// @desc      Add New Image
// @access    Private
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/src/assets/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/new_image",
  [
    upload.single("photo"),
    [
      check("title", "Please enter a title").not().isEmpty(),
      check("description", "Please enter a description ").not().isEmpty(),
    ],
    protect,
  ],
  createImg
);

// @route   api/images/all
// @method  GET
// @desc    Get all images
// @access  Public
router.get("/all", allImages);

// @route   api/images/all/:img_id
// @method  GET
// @desc    Get Image By Id
// @access  Public
router.get("/all/:img_id", imageId);

// @route   api/images/user_images
// @method  GET
// @desc    Get All User Images
// @access  Private
router.get("/user_images", protect, userImages);

// @route   api/images/user_images/:id
// @method  GET
// @desc    Get An User Image
// @access  Private
router.get("/user_images/:id", protect, userImageId);

// @route   api/images/like/:id
// @method  PUT
// @desc    Like An Image
// @access  Private
router.put("/like/:id", protect, likeImg);

// @route   api/images/unlike/:id
// @method  PUT
// @desc    Like An Image
// @access  Private
router.put("/unlike/:id", protect, unLikeImg);


// @route   api/images/user_images/:photoId
// @method  DELETE
// @desc    Delete An Image
// @access  Private
router.delete("/user_images/:photoId", protect, removeImg);

// @route   api/images/user_images/:photoId
// @method  POST
// @desc    Edit An Image
// @access  Private
router.post("/user_images/:photoId", [upload.single('photo'), protect], editImg);

module.exports = router;

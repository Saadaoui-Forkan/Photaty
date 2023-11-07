const router = require('express').Router()
const { registerUser, loginUser, getCurrentUser, updateProfile } = require('../controllers/userCtr')
const { check } = require('express-validator')
const  protect  = require('../middleware/AuthMiddleware')
const multer = require('multer')
const path = require('path')

// @route     api/users/register
// @method    Post
// @desc      Register User
// @access    Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "confirmPassword",
      "Please enter a confirm password"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

// @route     api/users/login
// @method    Post
// @desc      Login User
// @access    Public
router.post(
    "/login",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    loginUser
  );

// @route     api/users/me
// @method    GET
// @desc      Get Current User
// @access    Private
router.get('/me', protect, getCurrentUser)

// @route     api/users/profile
// @method    POST
// @desc      Update User Profile
// @access    Private
const storage = multer.diskStorage({
  destination: function (req,file,cb){
      cb(null,path.join(__dirname,"../../client/src/assets/profile"));
  },
  filename: function (req,file,cb){
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});
const upload = multer({ storage: storage });
router.post('/profile', [upload.single("avatar"), protect], updateProfile)

module.exports = router;
const router = require('express').Router()
const { registerUser, loginUser, getCurrentUser } = require('../controllers/UserCtr')
const { check } = require('express-validator')
const  protect  = require('../middleware/AuthMiddleware')

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
// @method    Get
// @desc      Get Current User
// @access    Private
router.get('/me', protect, getCurrentUser)

module.exports = router;
const { validationResult } = require("express-validator");
const Image = require("../models/Image");
const User = require("../models/User");

// Create a New Image Post
const createImg = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Create New Image
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // const author = user.name;
    const newImg = new Image({
      title: req.body.title,
      description: req.body.description,
      photo: req.file?.filename,
      user: req.user.id,
      name: user.name,
    });
    const img = await newImg.save();
    res.json(img);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// Get All Images
const allImages = async (req, res) => {
  try {
    let posts = await Image.find()
      .sort({ date: -1 })
      .populate("user", "name avatar id");
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

// Get Image By Id
const imageId = async (req, res) => {
  try {
    const post = await Image.findById(req.params.img_id).populate(
      "user",
      "name avatar id"
    );
    res.json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

// Get User Images
const userImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("user", "name avatar id");

    res.json(images);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Image By Id
const userImageId = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

// HandleLike An Image
const handleLikeImg = async (req, res) => {
  try {
    
    const userId = req.user.id
    const { id: postId } = req.params;
    const post = await Image.findById(postId);
    const likedPost = post.likes.find(p => p.user.toString() == userId)

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (!likedPost) {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.status(200).json(post)
    } else {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id)

      post.likes.splice(removeIndex, 1)
      await post.save();
      res.status(200).json(post)
    }
     
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
};

// Remove An Image
const removeImg = async (req, res) => {
  try {
    const post = await Image.findById(req.params.photoId);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    // Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (err) {
    // return res.status(404).json({ msg: "Post Not Found" });
    res.status(500).send("Server error");
  }
};

// Update Image
const editImg = async (req, res) => {
  try {
    const post = await Image.findById(req.params.photoId);

    post.title = req.body.title;
    post.description = req.body.description;
    post.photo = req.file ? req.file.filename : post.photo;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send("Server error" + error.message);
  }
};

module.exports = {
  createImg,
  allImages,
  imageId,
  userImages,
  userImageId,
  removeImg,
  editImg,
  handleLikeImg,
};

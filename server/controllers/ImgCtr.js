const multer = require('multer')
const {  validationResult } = require('express-validator')
const Image = require('../models/Image')
const User = require('../models/User')

// Create a New Image Post
filename = "";
const createImg = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Create New Image
        const newImg = new Image({
            title : req.body.title,
            description: req.body.description,
            category: req.body.category,
            photo: req.file.filename,
            user: req.user.id
        })
        const img = await newImg.save()
        res.json(img)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error"); 
    }
}

// Get All Images
const allImages = async(req, res) => {
    try {
        const posts = await Image.find().sort({ date: -1 }); 
        res.json(posts);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server error"); 
    }
}

// Get Image By Id
const imageId = async(req, res) => {
    try {
        const post = await Image.findById(req.params.img_id); 
        res.json(post);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server error"); 
    }
}

// Get User Images
const userImages = async(req, res) => {
    try {
        const images = await Image.find({ user: req.user.id }).sort({ date: -1 })
        console.log(images);
        res.json(images); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// Get Image By Id
const userImageId = async(req, res) => {
    try {
        const image = await Image.findById(req.params.id); 
        res.json(image);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server error"); 
    }
}

// Like An Image
const likeImg = async(req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // Check if the post has already been likred
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "Post already liked" });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server Error");
    }
}

// UnLike An Image
const unLikeImg = async(req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has been likred
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: "Post has not yet been liked" });
      }

      // Get remove index
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();
      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
}

module.exports = {
    createImg,
    allImages,
    imageId,
    userImages,
    userImageId,
    likeImg,
    unLikeImg
}
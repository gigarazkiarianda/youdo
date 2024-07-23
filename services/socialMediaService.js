const { socialMedia, SocialMedia} = require('../models');

const createPost = async (content) => {
    return await SocialMedia.cretae({ content });
};

const getPosts = async () => {
    return await SocialMedia.findAll();
};

module.exports = { createPost, getPosts };
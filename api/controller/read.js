import PostModel from "../models/Post.js"

export const getPostFunc = async (req, res) => {
    res.json(await PostModel.find());
}
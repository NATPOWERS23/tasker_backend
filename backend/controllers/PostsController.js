import PostModel from  '../models/Post.js'

export const getAllPosts = async (req, res) => {
    try {
        const userId = req.query.userId;
        const posts = await PostModel.find({ user: userId }).populate('user').exec();
        
        res.json(posts)
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
  
    try {
      const doc = await PostModel.findOneAndDelete({ _id: postId });
  
      if (!doc) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ success: true });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid post ID' });
      }
  
      handleUnexpectedError(error, res);
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findOne({
            _id: postId,
        }).populate('user').exec();

        if (!post) {
            return res.status(404).json({
                message: 'The post is not found'
            });
        }

        res.json(post)
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.updateOne({
            _id: postId
        }, {
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            success: true
        });
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

function handleUnexpectedError(error, res) {
    console.error(error);
    res.status(500).json({ message: 'Error with post handling' });
}
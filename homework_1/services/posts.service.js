import Post from '../models/posts.model.js';
import { NotAllowed } from '../consts/errors.const.js';


export class PostsService {
    static async getAllPosts (userId) {
        return Post.find({ userId }).populate('userId', '_id username'); // populate references the data from the User model, but the full data is not actually saved in the post in the database, just the id for reference
    }

    static async createPost (body, userId) {
        //If req.session.userId is the actual id string in the controller, then by creating the post we are also making an objectId from the userId because of the User Model/Schema?
        const post = {
            userId,
            title: body.title,
            content: body.content,
            likedBy: [],
        }

        const createdPost = await Post.create(post);

        return createdPost;
    }

    static async likePost(postId, userId) {
        const post = await Post.findById(postId);
        //Now userId (from req.session.userId) is a string, but the userId property in post is an objectId?

        if(post.userId.toString() === userId) throw new NotAllowed("You can't like your own post.");

        let likes;

        if(post.likedBy.includes(userId)) likes = post.likedBy.filter(user => user.toString() !== userId);
        else {
            likes = post.likedBy;
            likes.push(userId);
        }

        return Post.findByIdAndUpdate(postId, { likedBy: likes }, { new: true });

        //Why is it that when we populate we get only an object with the userId, and not everything about the user, like in 'createPost'?
        // if(post.likedBy.some(user => user._id.toString() === userId)) likes = post.likedBy.filter(userObject => userObject._id.toString() !== userId);
        // else {
        //     likes = post.likedBy;
        //     likes.push(userId);
        // }

        // return Post.findByIdAndUpdate(postId, { likedBy: likes }, { new: true }).populate('likedBy.user'); 
    }

    static async editPost (postId, newContent, userId) {
        const post = await Post.findById(postId);

        if(post.userId.toString() !== userId) throw new NotAllowed("You can't edit others' posts.");

        return Post.findByIdAndUpdate(postId, newContent, { new: true });
    }

    static async deletePost (postId, userId) {
        const post = await Post.findById(postId);

        if(post.userId.toString() !== userId) throw new NotAllowed("You can't delete others' posts.");

        await Post.findByIdAndDelete(postId);
    }
}
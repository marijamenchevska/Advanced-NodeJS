import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user', // not necessary if we don't populate
            required: true
        },

        title: {
            type: String,
            maxlength: 50,
            required: true
        },

        content: {
            type: String,
            maxlength: 2500,
            required: true
        },

        likedBy: {
            type: Array
        }

        // likedBy: [
        //     {
        //         user: {
        //         type: Schema.Types.ObjectId,
        //         ref: 'user'
        //         }
        //     }
        // ]
    },

    {
        timestamps: true
    }
);

const Post = model('post', postSchema);

export default Post;
import { Schema, model } from 'mongoose';

const userSchema = new Schema (
    {
        name: {
            type: String,
            minlegnth: 3,
            maxlength: 10
        },

        username: {
            type: String,
            minlength: 3,
            maxlength: 15,
            required: true
        },

        password: {
            type: String,
            // minlength: 8, Unnecessary: Hashed Password is longer anyway
            required: true
        }
    },
    
    {
        timestamps: true
    }
);

const User = model('user', userSchema);

export default User;
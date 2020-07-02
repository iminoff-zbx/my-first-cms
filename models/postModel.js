const mongoose = require('mongoose');
const { isEmpty } = require('../config/customFunctions');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'public'
    },

    file: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],

    allowComments: {
        type: Boolean,
        default: false
    }

})

module.exports = {Post: mongoose.model('post', PostSchema )};
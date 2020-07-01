const Post = require('../models/postModel').Post;
const Category = require('../models/CategoryModel').Category;


module.exports = {
    index: (req, res) => {
        res.render('admin/index')
    },


    /** All Post Methods */
    getPosts: async (req, res) => {
        const posts = await Post.find({}).lean();
        res.render('admin/posts/index', {posts: posts});
    },

    submitPosts: (req, res) => {

        const commentsAllowed = req.body.allowComments ? true : false;

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        })
    },

    createPosts: (req, res) => {
        res.render('admin/posts/create')
    },

    editPost: (req, res) => {
        const id = req.params.id;

        Post.findByIdAndUpdate(id).lean().then(post => {
            res.render('admin/posts/edit', {post: post})
        })

    },

    deletePost: (req, res) => {
        const id = req.params.id;
        Post.findByIdAndRemove(id).lean().then(deletedPost => {
            req.flash('success-message', `The post "${deletedPost.title}" has been deleted.`);
            res.redirect('/admin/posts');
        });
    },


    /** All Category Methods */
    getCategories: (req, res) => {
        Category.find().lean().then( cats => {
            res.render('admin/categories/index', {categories: cats});
        })
    },

    createCategories: (req, res) => {
        var categoryName = req.body.name;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }

    }
}
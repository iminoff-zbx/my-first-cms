const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require('../config/customFunctions');



router.all('/*', isUserAuthenticated, ((req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
}));

router.route('/')
    .get(adminController.index);


// Various admin post endpints

router.route('/posts')
    .get(adminController.getPosts);
    

router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);


router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .put(adminController.editPostSubmit);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);

// Admin Category Routes
router.route('/categories')
    .get(adminController.getCategories)


router.route('/categories/create')
    .get(adminController.getCategories)
    .post(adminController.createCategories)

router.route('/categories/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);
    

module.exports = router;
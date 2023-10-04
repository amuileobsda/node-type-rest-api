import { Router } from 'express'
import { getCategories } from '../controllers/category.controller'
// import { getPosts, createPost, getPost, deletePost, updatePost } from '../controllers/post.controller'

const router = Router();

router.route('/')
    .get(getCategories)
    // .post(createPost);

router.route('/:categoryId')
    // .get(getCategory)
    // .delete(deletePost)
    // .put(updatePost);

export default router;
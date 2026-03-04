const { 
    getPosts, 
    getOnePost, 
    createOnePost, 
    updateOnePost, 
    deleteOnePost, 
    addReaction, 
    deleteReaction,
 } = require("../../controllers/postController");

const router = require('express').Router();

// ============================= Post Routes =============================

router.get('/', getPosts);

router.get('/:postId', getOnePost);

router.post('/', createOnePost);

router.put('/:postId', updateOnePost);

router.delete('/:postId', deleteOnePost);



// ============================= Reaction Routes =============================

router.post('/:postId/reactions', addReaction);

router.delete('/:postId/reactions/:reactionId', deleteReaction);

module.exports = router;
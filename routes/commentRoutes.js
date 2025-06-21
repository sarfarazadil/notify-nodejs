const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByPost,
  getCommentThread,
  getSingleComment,
  updateComment,
  deleteComment,
    ping ,
} = require('../controllers/commentController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createComment);
router.get('/:postId', getCommentsByPost);
router.get('/:postId/thread', getCommentThread);
router.get('/:commentId', getSingleComment);
router.patch('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);
router.get('/ping/pong' ,ping);
module.exports = router;
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { detectMentions } = require('../services/mentionService');
const { sendCommentNotification, sendReplyNotification } = require('../services/emailService');

const ping = (req, res) => {
  res.json({ message: 'pong' });
};


const createComment = async (req, res, next) => {
  try {
    const { text, postId, parentCommentId } = req.body;
    const userId = req.user._id;

    // Create the comment
    const comment = await Comment.create({
      text,
      userId,
      postId,
      parentCommentId: parentCommentId || null,
    });

    // If this is a reply, add it to the parent's replies array
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id },
      });

      // Create reply notification
      const parentComment = await Comment.findById(parentCommentId).populate('userId');
      if (parentComment.userId._id.toString() !== userId.toString()) {
        await Notification.create({
          receiverUserId: parentComment.userId._id,
          type: 'reply',
          sourceCommentId: comment._id,
          postId,
        });

        // Send email notification for reply
        await sendReplyNotification(parentComment.userId.email, req.user.username, postId);
      }
    } else {
      // Create comment notification (if not the post author - you might need post author info here)
      // This would require additional logic to get post author
    }

    // Handle mentions
    const mentionedUsernames = detectMentions(text);
    if (mentionedUsernames.length > 0) {
      const mentionedUsers = await User.find({ username: { $in: mentionedUsernames } });
      
      for (const user of mentionedUsers) {
        if (user._id.toString() !== userId.toString()) {
          await Notification.create({
            receiverUserId: user._id,
            type: 'mention',
            sourceCommentId: comment._id,
            postId,
          });

          // Send email notification for mention
          await sendCommentNotification(user.email, req.user.username, postId);
        }
      }
    }

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId, parentCommentId: null })
      .populate('userId', 'username')
      .populate({
        path: 'replies',
        populate: {
          path: 'userId',
          select: 'username',
        },
      });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const getCommentThread = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate('userId', 'username')
      .sort({ createdAt: 1 });

    // Build threaded structure
    const commentMap = {};
    const roots = [];

    comments.forEach(comment => {
      commentMap[comment._id] = comment;
      comment.replies = [];
    });

    comments.forEach(comment => {
      if (comment.parentCommentId) {
        if (commentMap[comment.parentCommentId]) {
          commentMap[comment.parentCommentId].replies.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    res.json(roots);
  } catch (err) {
    next(err);
  }
};

const getSingleComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId)
      .populate('userId', 'username')
      .populate({
        path: 'replies',
        populate: {
          path: 'userId',
          select: 'username',
        },
      });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the author or admin
    if (comment.userId.toString() !== userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (err) {

    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the author or admin
    if (comment.userId.toString() !== userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // If it's a parent comment with replies, we might want to handle that differently
    if (comment.replies.length > 0) {
      // Delete all replies 
      await Comment.deleteMany({ _id: { $in: comment.replies } });
      
    }

    // Remove from parent's replies array if it's a reply
    if (comment.parentCommentId) {
      await Comment.findByIdAndUpdate(comment.parentCommentId, {
        $pull: { replies: comment._id },
      });
    }

    await comment.deleteOne();

    // Delete related notifications
    await Notification.deleteMany({ sourceCommentId: comment._id });

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  getCommentThread,
  getSingleComment,
  updateComment,
  deleteComment,
  ping,
};
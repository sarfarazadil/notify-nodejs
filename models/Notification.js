const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  receiverUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['comment', 'reply', 'mention'],
    required: true,
  },
  sourceCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
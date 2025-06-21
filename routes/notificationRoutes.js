const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
    ping,
} = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getNotifications);
router.patch('/:id/read', protect, markNotificationAsRead);
router.patch('/mark-all-read', protect, markAllNotificationsAsRead);
router.delete('/:id', protect, deleteNotification);
router.get('/ping/pong' ,ping);
module.exports = router;
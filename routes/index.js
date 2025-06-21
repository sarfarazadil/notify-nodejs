const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/comments', require('./commentRoutes'));
router.use('/notifications', require('./notificationRoutes'));



module.exports = router;
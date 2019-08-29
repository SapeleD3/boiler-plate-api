const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const feedController = require('../controllers/feed')

router.post('/', checkAuth, feedController.createFeed)
router.get('/', feedController.viewFeeds);
router.get('/:id', feedController.viewFeed);
router.put('/:id', feedController.updateFeed)
router.delete('/:id', feedController.deleteFeed)


module.exports = router;
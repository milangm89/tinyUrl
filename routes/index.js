let express = require('express');
let Index = require('../controllers/index');
let TinyUrl = require('../controllers/tinyurl');
let router = express.Router();



router.get('/', Index.index_get);
router.post('/new-url', Index.index_post);
router.get('/:url?', TinyUrl.index_get);

module.exports = router;
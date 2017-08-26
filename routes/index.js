let express    = require('express');
let Index = require('../controllers/index');
let TinyUrl = require('../controllers/tinyurl');
let router     = express.Router();

router.get('/', Index.index.get);
router.post('/new-url', Index.index.post);
router.get('/:url?', TinyUrl.index.get);

module.exports = router;

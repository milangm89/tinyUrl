let express    = require('express');
let Index = require('../controllers/index');
let router     = express.Router();

router.get('/', Index.index.get);
router.post('/shortner', Index.index.post);

module.exports = router;

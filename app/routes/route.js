const express = require('express');
const router = express();

router.use('/', require('./router/userRoute'));

module.exports = router;
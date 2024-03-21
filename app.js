const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const logger = require('./app/logger/logger');
require('./app/helper/db');

const cors = require('cors');
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./app/routes/route'));
app.use(require('./app/helper/response'));
app.use(require('./app/helper/error').handleJoiErrors);
app.use(require('./app/helper/error').handleErrors);
app.use(require('./app/helper/error').errorHandler);
app.use(require('./app/helper/error').asyncHandler);

app.listen(port, () => {
 logger.info(`Server is running.. :${port}`);
});

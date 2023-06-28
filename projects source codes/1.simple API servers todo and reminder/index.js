const express = require("express");
const app = express();

// require('./startup/logger')()
require('./startup/db')();
require('./startup/routers')(app);

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
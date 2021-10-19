const cors = require("cors");
const path = require("path");
const nocache = require("nocache");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routes = require("./routes");
const errors = require("./errors");
const response = require("./response");
const providers = require("./providers");
const { port, timezone } = require("@config/app");

const app = express();

/*
|--------------------------------------------------------------------------
| basic middlewares
|--------------------------------------------------------------------------
| compression - to compress response ( gzip, deflate )
| morgan - to log http request, req ( only 4xx, 5xx)
| bodyParser - to parse request object to JSON
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

/*
|--------------------------------------------------------------------------
| Basic Setup
|--------------------------------------------------------------------------
*/
process.env.TZ = timezone;

/*
|--------------------------------------------------------------------------
| Load Providers
|--------------------------------------------------------------------------
|
*/
providers.load();

/*
|--------------------------------------------------------------------------
| Response Modifier
|
| adds functions like res.error, res.success etc
|--------------------------------------------------------------------------
|
*/

app.use(function(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

response.modify(app);

/*
|--------------------------------------------------------------------------
| Setting the static folder
|--------------------------------------------------------------------------
|
| tell express to use the folder as static.
*/
app.use("/public", express.static(path.join(__dirname, "../public")));

/*
|--------------------------------------------------------------------------
| Setting views folder
|--------------------------------------------------------------------------
|
| tell express which folder to use as views
*/
app.set("views", path.join(__dirname, "../views"));

/*
|--------------------------------------------------------------------------
| Load Routes
|--------------------------------------------------------------------------
*/
routes.load(app);

/*
|--------------------------------------------------------------------------
| error handler
|--------------------------------------------------------------------------
|
| error handling
*/
app.use(errors.handle);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
|
| express does treat 404 as error by default
*/
app.use(function(req, res, next) {
  res.error({ status: 404, message: "Invalid URL" }, 404);
});

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| start the express server to listen on the port
*/
app.listen(port, () => console.log(`🔥 App listening on port ${port}! 🚀`));

module.exports = app;

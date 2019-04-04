"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _scraper = require("./scraper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Imports */
const pup = require('puppeteer'); //import dotenv from 'dotenv';

/** General Config */
//dotenv.config();


let scraper;

(async () => {
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.goto('https://exposure.cards/randomhunt/');
  scraper = new _scraper.Scraper(page);
  console.log('Scraper ready');
})();

const port = 8888; //process.env.PORT;

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.listen(port, () => {
  console.log('Express app started', port);
});
/** App Endpoints */

app.get('/', async (req, res) => {
  const products = await scraper.scrape('.product');
  console.log(products);
  res.send(JSON.stringify(products));
});
/** Imports */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Scraper } from './scraper';
const pup = require('puppeteer');
//import dotenv from 'dotenv';

/** General Config */
//dotenv.config();
let scraper;
(async () => {
	const browser = await pup.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	const page = await browser.newPage();
	await page.goto('https://exposure.cards/randomhunt/');
	scraper = new Scraper(page);
	console.log('Scraper ready');
})();

const port = 8888; //process.env.PORT;
const app = express();
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.listen(port, () => {
	console.log('Express app started', port);
});

/** App Endpoints */
app.get('/', async (req, res) => {
	const products = await scraper.scrape('.product');
	console.log(products);
	res.send(JSON.stringify(products));
});

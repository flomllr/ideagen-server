const $ = require('cheerio');

export class Scraper {
	constructor(page) {
		this.page = page;
	}
	async getHTML() {
		try {
			await this.page.keyboard.press('Space');
			return await this.page.content();
		} catch (e) {
			console.error(e);
		}
	}
	async scrape(cssSelector) {
		const html = await this.getHTML();
		const elems = $(cssSelector, html).toArray();
		const html_elems = elems.map(e => $.html(e));
		return html_elems;
	}
}

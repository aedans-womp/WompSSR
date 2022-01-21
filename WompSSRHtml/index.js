const puppeteer = require("puppeteer");

let browser;

module.exports = async function (context, req) {
    if (!browser) {
        browser = await puppeteer.launch();
    }

    context.log('JavaScript HTTP trigger function processed a request.');
    const url = req.query.url || "https://www.bedbathandbeyond.com/amp/store/category/bedding/comforter-sets/15502";
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForNetworkIdle();
    const html = await page.content();

    context.res = {
        body: html,
        headers: {
            "content-type": "text/html"
        }
    };
}
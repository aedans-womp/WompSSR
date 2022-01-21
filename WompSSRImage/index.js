const puppeteer = require("puppeteer");

let browser;

module.exports = async function (context, req) {
    if (!browser) {
        browser = await puppeteer.launch();
    }

    const url = req.query.url || "https://www.bedbathandbeyond.com/amp/store/category/bedding/comforter-sets/15502";
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForNetworkIdle();
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
};
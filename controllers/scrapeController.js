import * as express from "express";
import puppeteer from 'puppeteer';

const router = express.Router()

export const scrapeController = router.get("/", async (_req, res) => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto('https://developer.chrome.com/');

    const pdf = await page.pdf({
        format: 'A4'
    });

    await page.close();

    await browser.close();

    res.status(200)
      .set({'content-type': 'application/pdf; charset=utf-8'})
      .send(pdf);
})


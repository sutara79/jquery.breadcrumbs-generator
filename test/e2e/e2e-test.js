/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

let path = 'breadcrumbs-generator';
describe(path, () => {
  let appUrl, browser, page;

  before(async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    // browser = await puppeteer.launch({headless: false, slowMo: 250});
    page = await browser.newPage();
    page.on('console', console.log);
  });

  after(async () => {
    browser.close();
  });

  it('should create breadcrumbs', async () => {
    await page.goto(
      `http://localhost:${process.env.MY_PORT}/sample/menu3-2-3.html`,
      {waitUntil: 'load'}
    );
    await page.waitFor(50);
    let txt = await page.evaluate(() => {
      return document.getElementById('breadcrumbs').textContent;
    });
    assert.equal(txt, 'HomeMenu3Menu3-2Menu3-2-3');
  });

  it('should create links', async () => {
    const navigationPromise = page.waitForNavigation();
    await page.click('#breadcrumbs > li:nth-child(2) > a');
    await navigationPromise;

    let txt = await page.evaluate(() => {
      return document.getElementById('breadcrumbs').textContent;
    });
    assert.equal(txt, 'HomeMenu3');
  });
});

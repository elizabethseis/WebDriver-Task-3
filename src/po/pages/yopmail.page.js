const {YopmailIframe, YopmailHome} = require('./../components');
const {faker} = require('@faker-js/faker');


class YopmailPage {
  constructor(pages) {
    this.pages = pages;
    this.home = new YopmailHome();
    this.yopmailIframe = new YopmailIframe();
  }

  static async createYopmail(pages) {
    await browser.newWindow('https://yopmail.com/es/');
    const handles = await browser.getWindowHandles();
    const randomEmail = faker.internet.email({firstName: 'Elizabeth_Wdio_task3', provider: 'yopmail.com'});
    await pages('yopmail').home.email.waitForClickable();
    await pages('yopmail').home.email.setValue(randomEmail);
    await browser.keys('\uE007');
    await browser.switchToWindow(handles[0]);
    return randomEmail;
  }

  static async validateTotalCostInEmail(pages, totalCost, randomEmail) {
    await pages('calculator').estimateEmail.emailInput.waitForClickable();
    await pages('calculator').estimateEmail.emailInput.setValue(randomEmail);
    await pages('calculator').estimateEmail.sendEmail.waitForClickable();
    await pages('calculator').estimateEmail.sendEmail.click();
    await browser.newWindow(`http://www.yopmail.com?${randomEmail}`);
    await pages('yopmail').home.refresh.waitForClickable();
    await pages('yopmail').home.countEmail.waitForExist();
    await pages('yopmail').home.refresh.click();
    let countEmail = await pages('yopmail').home.countEmail.getText();
    do {
      await pages('yopmail').home.refresh.waitForClickable();
      await pages('yopmail').home.refresh.click();
      await pages('yopmail').home.countEmail.waitForExist();
      countEmail = await pages('yopmail').home.countEmail.getText();
    } while (countEmail == '0 mail');
    await pages('yopmail').yopmailIframe.iframe.waitForExist();
    const getDocumentText = () => browser.executeScript(
        'return document.documentElement.outerText',
        [],
    );
    const yopmailIFrameLocator = pages('yopmail').yopmailIframe.iframeId;
    const iframe = await browser.findElement('css selector', yopmailIFrameLocator);
    await browser.switchToFrame(iframe);
    await expect(await getDocumentText()).toContain(`Estimated Monthly Cost: USD ${totalCost}`);
  }
}
module.exports = YopmailPage;

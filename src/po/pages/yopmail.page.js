const {faker} = require('@faker-js/faker');

class YopmailPage {
  get iframe() {
    return $('div[id="wmmailmain"] iframe');
  }

  get iframeId() {
    return ('iframe[id="ifmail"]');
  }

  get email() {
    return $('input[id="login"]');
  }

  get refresh() {
    return $('button[id="refresh"]');
  }

  get countEmail() {
    return $('div[id="nbmail"]');
  }

  async createEmailYopmail() {
    await browser.newWindow('https://yopmail.com/es/');
    const handles = await browser.getWindowHandles();
    const randomEmail = faker.internet.email({firstName: 'Elizabeth_Wdio_task3', provider: 'yopmail.com'});
    await this.email.waitForClickable();
    await this.email.setValue(randomEmail);
    await browser.keys('\uE007');
    await browser.switchToWindow(handles[0]);
    return randomEmail;
  }

  async validateTotalCostInEmail(totalCost, randomEmail) {
    await browser.newWindow(`http://www.yopmail.com?${randomEmail}`);
    await this.refresh.waitForClickable();
    await this.countEmail.waitForExist();
    await this.refresh.click();
    let countEmail = await this.countEmail.getText();
    do {
      await this.refresh.waitForClickable();
      await this.refresh.click();
      await this.countEmail.waitForExist();
      countEmail = await this.countEmail.getText();
    } while (countEmail == '0 mail');
    await this.iframe.waitForExist();
    const getDocumentText = () => browser.executeScript(
        'return document.documentElement.outerText',
        [],
    );
    const yopmailIFrameLocator = this.iframeId;
    const iframe = await browser.findElement('css selector', yopmailIFrameLocator);
    await browser.switchToFrame(iframe);
    await expect(await getDocumentText()).toContain(`Estimated Monthly Cost: USD ${totalCost}`);
  }
}
module.exports = YopmailPage;


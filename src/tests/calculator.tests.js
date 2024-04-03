const {faker} = require('@faker-js/faker');
const {pages} = require('./../po');

describe('Google Cloud Platform Pricing Calculator', () => {
  beforeEach(async () => {
    await pages('googleCloud').open();
    await browser.maximizeWindow();
  });

  it('Validate tha page title', async () => {
    await expect(browser).toHaveUrl('https://cloud.google.com/');
  });

  it('Validate Total Estimated Monthly Cost', async () => {
    await pages('base').header.searchBtn.isDisplayed();
    await pages('base').header.searchBtn.click();
    await pages('base').header.searchInput.isDisplayed();
    await pages('base').header.searchInput.setValue('Google Cloud Platform Pricing Calculator');
    await browser.keys('\uE007');
    await pages('search').search.result.isDisplayed();
    await pages('search').search.result.click();
    const parentIFrameLocator = pages('calculator').iframe.parentIFrameLocator;
    const parentIFrame = await browser.findElement('css selector', parentIFrameLocator);
    await browser.switchToFrame(parentIFrame);
    const childIFrameLocator = pages('calculator').iframe.childIFrameLocator;
    const childIFrame = await browser.findElement('css selector', childIFrameLocator);
    await browser.switchToFrame(childIFrame);
    await expect(pages('calculator').computeEngine.title).toHaveText('Google Cloud Pricing Calculator');
    await pages('calculator').computeEngine.instances.setValue('4');
    await expect(pages('calculator').computeEngine.instancesFor).toHaveText('What are these instances for?');
    await expect(pages('calculator').computeEngine.operatingSystem).toHaveText('Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)');
    await expect(pages('calculator').computeEngine.model).toHaveText('Regular');
    await expect(pages('calculator').computeEngine.machineFamily).toHaveText('General purpose');
    await pages('calculator').computeEngine.series('dropdownMenu').click();
    await pages('calculator').computeEngine.series('n1').waitForExist();
    await pages('calculator').computeEngine.series('n1').click();
    await browser.scroll(0, 500);
    await pages('calculator').computeEngine.machineType('dropdownMenu').click();
    await pages('calculator').computeEngine.machineType('n1').waitForClickable();
    await pages('calculator').computeEngine.machineType('n1').click();
    await pages('calculator').computeEngine.addGPUs.waitForExist();
    await pages('calculator').computeEngine.addGPUs.click();
    await pages('calculator').computeEngine.gpuType('dropdownMenu').waitForExist();
    await pages('calculator').computeEngine.gpuType('dropdownMenu').click();
    await pages('calculator').computeEngine.gpuType('teslaK80').waitForExist();
    await pages('calculator').computeEngine.gpuType('teslaK80').click();
    await pages('calculator').computeEngine.numberGPUs('dropdownMenu').waitForExist();
    await pages('calculator').computeEngine.numberGPUs('dropdownMenu').click();
    await pages('calculator').computeEngine.numberGPUs('option1').waitForExist();
    await pages('calculator').computeEngine.numberGPUs('option1').click();
    await browser.scroll(0, 500);
    await pages('calculator').computeEngine.localSSD('dropdownMenu').waitForExist();
    await pages('calculator').computeEngine.localSSD('dropdownMenu').click();
    await pages('calculator').computeEngine.localSSD('option2x375').waitForClickable();
    await pages('calculator').computeEngine.localSSD('option2x375').click();
    await pages('calculator').computeEngine.datacenter('dropdownMenu').waitForExist();
    await pages('calculator').computeEngine.datacenter('dropdownMenu').click();
    await pages('calculator').computeEngine.datacenter('searchRegion').waitForClickable();
    await pages('calculator').computeEngine.datacenter('searchRegion').setValue('Frankfurt');
    await pages('calculator').computeEngine.datacenter('selectOption').waitForClickable();
    await pages('calculator').computeEngine.datacenter('selectOption').click();
    await pages('calculator').computeEngine.commitedUsage('dropdownMenu').waitForExist();
    await pages('calculator').computeEngine.commitedUsage('dropdownMenu').click();
    await pages('calculator').computeEngine.commitedUsage('oneYear').waitForClickable();
    await pages('calculator').computeEngine.commitedUsage('oneYear').click();
    await pages('calculator').computeEngine.addEstimate.waitForExist();
    await pages('calculator').computeEngine.addEstimate.click();
    await pages('calculator').estimate.totalEstimated.waitForExist();
    const estimatedInstance = await pages('calculator').estimate.estimatedInstance.getText();
    const estimatedGPU = await pages('calculator').estimate.estimatedGPU.getText();
    const usd = (str) => parseFloat(str.split(' ')[1]);
    const totalCost = (usd(estimatedInstance) + usd(estimatedGPU)).toLocaleString('en-US', {minimumFractionDigits: 2});
    await expect(pages('calculator').estimate.totalEstimated).toHaveText(`Total Estimated Cost: USD ${totalCost} per 1 month`);
    await pages('calculator').estimate.emailEstimate.click();
    await browser.newWindow('https://yopmail.com/es/');
    const handles = await browser.getWindowHandles();
    const randomEmail = faker.internet.email({firstName: 'Elizabeth_Epam_Wdio', provider: 'yopmail.com', allowSpecialCharacters: true});
    await pages('yopmail').home.email.waitForClickable();
    await pages('yopmail').home.email.setValue(randomEmail);
    await browser.keys('\uE007');
    await browser.switchToWindow(handles[0]);
    await browser.switchToFrame(parentIFrame);
    await browser.switchToFrame(childIFrame);
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
  });
});

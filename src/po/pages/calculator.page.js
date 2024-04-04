const {CalculatorIframe, ComputeEngine, Estimate, EmailEstimate} = require('./../components');

class CalculatorPage {
  constructor(pages) {
    this.pages = pages;
    this.computeEngine = new ComputeEngine();
    this.iframe = new CalculatorIframe();
    this.estimate = new Estimate();
    this.estimateEmail = new EmailEstimate();
  }

  static async switchToCalculatorFrame(pages) {
    const parentIFrameLocator = pages('calculator').iframe.parentIFrameLocator;
    const parentIFrame = await browser.findElement('css selector', parentIFrameLocator);
    await browser.switchToFrame(parentIFrame);
    const childIFrameLocator = pages('calculator').iframe.childIFrameLocator;
    const childIFrame = await browser.findElement('css selector', childIFrameLocator);
    await browser.switchToFrame(childIFrame);
    await expect(pages('calculator').computeEngine.title).toHaveText('Google Cloud Pricing Calculator');
  }

  static async fillCalculatorForm(pages) {
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
  }

  static async calculateTotalCost(pages) {
    await pages('calculator').estimate.totalEstimated.waitForExist();
    const estimatedInstance = await pages('calculator').estimate.estimatedInstance.getText();
    const estimatedGPU = await pages('calculator').estimate.estimatedGPU.getText();
    const usd = (str) => parseFloat(str.split(' ')[1]);
    const totalCost = (usd(estimatedInstance) + usd(estimatedGPU)).toLocaleString('en-US', {minimumFractionDigits: 2});
    return totalCost;
  }

  static async sendEmailEstimate(pages) {
    await pages('calculator').estimate.emailEstimate.click();
  }
}

module.exports = CalculatorPage;

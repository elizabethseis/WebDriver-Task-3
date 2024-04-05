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
    await pages('calculator').computeEngine.instancesFor.waitForExist();
    await pages('calculator').computeEngine.operatingSystem.waitForExist();
    await pages('calculator').computeEngine.model.waitForExist();
    await pages('calculator').computeEngine.machineFamily.waitForExist();

    await this.selectSeries(pages, 'n1');
    await this.selectMachineType(pages, 'n1');
    await browser.scroll(0, 500);
    await pages('calculator').computeEngine.addGPUs.waitForExist();
    await pages('calculator').computeEngine.addGPUs.click();
    await this.selectGPUType(pages, 'teslaK80');
    await this.selectNumberGPUs(pages, 'option1');
    await browser.scroll(0, 500);
    await pages('calculator').computeEngine.localSSD('dropdownMenu').waitForExist();
    await this.selectLocalSSD(pages, 'option2x375');
    await pages('calculator').computeEngine.datacenter('dropdownMenu').waitForExist();
    await this.selectDatacenter(pages, 'selectOption');
    await pages('calculator').computeEngine.commitedUsage('dropdownMenu').waitForExist();
    await this.selectCommitedUsage(pages, 'oneYear');
    await pages('calculator').computeEngine.addEstimate.waitForExist();
    await pages('calculator').computeEngine.addEstimate.click();
  }

  static async selectSeries(pages, seriesOption) {
    await pages('calculator').computeEngine.series('dropdownMenu').click();
    await pages('calculator').computeEngine.series(seriesOption).waitForExist();
    await pages('calculator').computeEngine.series(seriesOption).click();
  }

  static async selectMachineType(pages, machineTypeOption) {
    await pages('calculator').computeEngine.machineType('dropdownMenu').click();
    await pages('calculator').computeEngine.machineType(machineTypeOption).waitForClickable();
    await pages('calculator').computeEngine.machineType(machineTypeOption).click();
  }

  static async selectGPUType(pages, gpuTypeOption) {
    await pages('calculator').computeEngine.gpuType('dropdownMenu').click();
    await pages('calculator').computeEngine.gpuType(gpuTypeOption).waitForExist();
    await pages('calculator').computeEngine.gpuType(gpuTypeOption).click();
  }

  static async selectNumberGPUs(pages, numberGPUsOption) {
    await pages('calculator').computeEngine.numberGPUs('dropdownMenu').click();
    await pages('calculator').computeEngine.numberGPUs(numberGPUsOption).waitForExist();
    await pages('calculator').computeEngine.numberGPUs(numberGPUsOption).click();
  }

  static async selectLocalSSD(pages, localSSDOption) {
    await pages('calculator').computeEngine.localSSD('dropdownMenu').click();
    await pages('calculator').computeEngine.localSSD(localSSDOption).waitForClickable();
    await pages('calculator').computeEngine.localSSD(localSSDOption).click();
  }

  static async selectDatacenter(pages, datacenterOption) {
    await pages('calculator').computeEngine.datacenter('dropdownMenu').click();
    await pages('calculator').computeEngine.datacenter('searchRegion').waitForClickable();
    await pages('calculator').computeEngine.datacenter('searchRegion').setValue('Frankfurt');
    await pages('calculator').computeEngine.datacenter(datacenterOption).waitForClickable();
    await pages('calculator').computeEngine.datacenter(datacenterOption).click();
  }

  static async selectCommitedUsage(pages, commitedUsageOption) {
    await pages('calculator').computeEngine.commitedUsage('dropdownMenu').click();
    await pages('calculator').computeEngine.commitedUsage(commitedUsageOption).waitForClickable();
    await pages('calculator').computeEngine.commitedUsage(commitedUsageOption).click();
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

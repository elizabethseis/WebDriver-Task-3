class CalculatorPage {

  get parentIFrameLocator() {
    return ('iframe[name^="goog"]');
  }

  get childIFrameLocator() {
    return ('iframe[id="myFrame"]');
  }

  get title() {
    return $('div[class="md-toolbar-tools"]');
  }

  get instances() {
    return $('[id="input_100"]');
  }

  get instancesFor() {
    return $('[for="input_101"]');
  }

  get operatingSystem() {
    return $('[id="select_value_label_92"]');
  }

  get model() {
    return $('[id="select_value_label_93"]');
  }

  get machineFamily() {
    return $('[id="select_value_label_94"]');
  }

  /**
 *
 * @param {'dropdownMenu' | 'n1'} option
 * @returns
 */
  series(option) {
    const selectors = {
      dropdownMenu: 'md-select-value[id="select_value_label_95"]',
      n1: 'md-option[value="n1"]',
    };
    return $(selectors[option]);
  }

  /**
 *
 * @param {'dropdownMenu' | 'n1'} option
 * @returns
 */
  machineType(option) {
    const selectors = {
      dropdownMenu: 'md-select-value[id="select_value_label_96"]',
      n1: 'md-option[ng-repeat="instance in typeInfo"]:nth-of-type(4)',
    };
    return $(selectors[option]);
  }

  get addGPUs() {
    return $('md-input-container md-checkbox[ng-model="listingCtrl.computeServer.addGPUs"]');
  }

  /**
 *
 * @param {'dropdownMenu' | 'teslaK80'} option
 * @returns
 */
  gpuType(option) {
    const selectors = {
      dropdownMenu: 'md-input-container md-select[placeholder="GPU type"]',
      teslaK80: '[value="NVIDIA_TESLA_K80"]',
    };
    return $(selectors[option]);
  }

  /**
 *
 * @param {'dropdownMenu' | 'option1'} option
 * @returns
 */
  numberGPUs(option) {
    const selectors = {
      dropdownMenu: 'md-input-container md-select[placeholder="Number of GPUs"]',
      option1: 'div[class="md-select-menu-container md-active md-clickable"] md-option:nth-child(2)',
    };
    return $(selectors[option]);
  }

  /**
 *
 * @param {'dropdownMenu' | 'option2x375'} option
 * @returns
 */
  localSSD(option) {
    const selectors = {
      dropdownMenu: 'md-input-container md-select md-select-value[id="select_value_label_468"]',
      option2x375: 'md-content md-option[id="select_option_495"]',
    };
    return $(selectors[option]);
  }

  /**
 *
 * @param {'dropdownMenu' | 'searchRegion' | 'selectOption'} option
 * @returns
 */
  datacenter(option) {
    const selectors = {
      dropdownMenu: 'md-select-value[id="select_value_label_98"]',
      searchRegion: 'input[id="input_132"]',
      selectOption: 'md-option[value="europe-west3"]:nth-child(1)',
    };
    return $(selectors[option]);
  }

  /**
 *
 * @param {'dropdownMenu' | 'oneYear'} option
 * @returns
 */
  commitedUsage(option) {
    const selectors = {
      dropdownMenu: '[id="select_value_label_99"]',
      oneYear: 'md-option[id="select_option_138"]',
    };
    return $(selectors[option]);
  }

  get addEstimate() {
    return $('button[ng-click="listingCtrl.addComputeServer(ComputeEngineForm);"]');
  }

  get totalEstimated() {
    return $('h2[class="md-title"] b[class="ng-binding"]');
  }

  get estimatedInstance() {
    return $('md-list-item div[class="ng-binding"]');
  }

  get estimatedGPU() {
    return $('md-list-item:nth-of-type(7) div[class="ng-binding"]');
  }

  get emailEstimate() {
    return $('button[id="Email Estimate"]');
  }

  get emailInput() {
    return $('form[name="emailForm"] md-input-container input[type="email"]');
  }

  get sendEmail() {
    return $('md-dialog-actions button:nth-child(2)');
  }

  async switchToCalculatorFrame() {
    const parentIFrameLocator = this.parentIFrameLocator;
    const parentIFrame = await browser.findElement('css selector', parentIFrameLocator);
    await browser.switchToFrame(parentIFrame);
    const childIFrameLocator = this.childIFrameLocator;
    const childIFrame = await browser.findElement('css selector', childIFrameLocator);
    await browser.switchToFrame(childIFrame);
    await expect(this.title).toHaveText('Google Cloud Pricing Calculator');
  }

    async fillCalculatorForm() {
    await this.instances.setValue('4');
    await this.instancesFor.waitForExist();
    await this.operatingSystem.waitForExist();
    await this.model.waitForExist();
    await this.machineFamily.waitForExist();

    await this.selectSeries('n1');
    await this.selectMachineType('n1');
    await browser.scroll(0, 500);
    await this.addGPUs.waitForExist();
    await this.addGPUs.click();
    await this.selectGPUType('teslaK80');
    await this.selectNumberGPUs('option1');
    await browser.scroll(0, 500);
    await this.localSSD('dropdownMenu').waitForExist();
    await this.selectLocalSSD('option2x375');
    await this.datacenter('dropdownMenu').waitForExist();
    await this.selectDatacenter('selectOption');
    await this.commitedUsage('dropdownMenu').waitForExist();
    await this.selectCommitedUsage('oneYear');
    await this.addEstimate.waitForExist();
    await this.addEstimate.click();
  }

  async selectSeries(seriesOption) {
    await this.series('dropdownMenu').click();
    await this.series(seriesOption).waitForExist();
    await this.series(seriesOption).click();
  }

  async selectMachineType(machineTypeOption) {
    await this.machineType('dropdownMenu').click();
    await this.machineType(machineTypeOption).waitForClickable();
    await this.machineType(machineTypeOption).click();
  }

  async selectGPUType(gpuTypeOption) {
    await this.gpuType('dropdownMenu').click();
    await this.gpuType(gpuTypeOption).waitForExist();
    await this.gpuType(gpuTypeOption).click();
  }

  async selectNumberGPUs(numberGPUsOption) {
    await this.numberGPUs('dropdownMenu').click();
    await this.numberGPUs(numberGPUsOption).waitForExist();
    await this.numberGPUs(numberGPUsOption).click();
  }

  async selectLocalSSD(localSSDOption) {
    await this.localSSD('dropdownMenu').click();
    await this.localSSD(localSSDOption).waitForClickable();
    await this.localSSD(localSSDOption).click();
  }

  async selectDatacenter(datacenterOption) {
    await this.datacenter('dropdownMenu').click();
    await this.datacenter('searchRegion').waitForClickable();
    await this.datacenter('searchRegion').setValue('Frankfurt');
    await this.datacenter(datacenterOption).waitForClickable();
    await this.datacenter(datacenterOption).click();
  }

  async selectCommitedUsage(commitedUsageOption) {
    await this.commitedUsage('dropdownMenu').click();
    await this.commitedUsage(commitedUsageOption).waitForClickable();
    await this.commitedUsage(commitedUsageOption).click();
  }


  async calculateTotalCost() {
    await this.totalEstimated.waitForExist();
    const estimatedInstance = await this.estimatedInstance.getText();
    const estimatedGPU = await this.estimatedGPU.getText();
    const usd = (str) => parseFloat(str.split(' ')[1]);
    const totalCost = (usd(estimatedInstance) + usd(estimatedGPU)).toLocaleString('en-US', {minimumFractionDigits: 2});
    return totalCost;
  }

  async emailEstimateOption() {
    await this.emailEstimate.click();
  }

  async sendEmailEstimate(randomEmail) {
    await this.emailInput.waitForClickable();
    await this.emailInput.setValue(randomEmail);
    await this.sendEmail.waitForClickable();
    await this.sendEmail.click();
  }

}
module.exports = CalculatorPage;

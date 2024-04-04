class ComputeEngineComponent {
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
      n1: 'md-option[value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]',
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
}
module.exports = ComputeEngineComponent;

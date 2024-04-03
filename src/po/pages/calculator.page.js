const {CalculatorIframe, ComputeEngine, Estimate, EmailEstimate} = require('./../components');

class CalculatorPage {
  constructor() {
    this.computeEngine = new ComputeEngine();
    this.iframe = new CalculatorIframe();
    this.estimate = new Estimate();
    this.estimateEmail = new EmailEstimate();
  }
}
module.exports = CalculatorPage;

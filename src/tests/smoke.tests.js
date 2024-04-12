const googleHomeCloudPage = require('./../po/pages/googleHomeCloud.page');
const searchResultsPage = require('./../po/pages/searchResults.page')
const calculatorPage = require('./../po/pages/calculator.page')


describe('Google Cloud Platform Pricing Calculator - Smoke Tests', () => {
  beforeEach(async () => {
    await googleHomeCloudPage.open('');
    await browser.maximizeWindow();
  });

  it.skip('Validate tha Google Cloud page title', async () => {
    await expect(browser).toHaveUrl('https://cloud.google.com/');
  });

  it.skip('Validate that the calculator page loads correctly', async () => {
    await googleHomeCloudPage.searchAndGoToCalculator('Google Cloud Platform Pricing Calculator');
    await searchResultsPage.validateResults();
    await calculatorPage.switchToCalculatorFrame();
    await expect(calculatorPage.title).toHaveText('Google Cloud Pricing Calculator');
  });

  it.skip('Validate basic calculator functionality', async () => {
    await googleHomeCloudPage.searchAndGoToCalculator('Google Cloud Platform Pricing Calculator');
    await searchResultsPage.validateResults();
    await calculatorPage.switchToCalculatorFrame();
    await calculatorPage.fillCalculatorForm();
    const totalCost = await calculatorPage.calculateTotalCost();
    await expect(calculatorPage.totalEstimated).toHaveText(`Total Estimated Cost: USD ${totalCost} per 1 month`);
  });
});

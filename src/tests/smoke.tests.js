const { pages, CalculatorPage, SearchResultsPage} = require('./../po');

describe('Google Cloud Platform Pricing Calculator - Smoke Tests', () => {
  beforeEach(async () => {
    await pages('googleCloud').open();
    await browser.maximizeWindow();
  });

  it('Validate tha Google Cloud page title', async () => {
    await expect(browser).toHaveUrl('https://cloud.google.com/');
  });

  it('Validate that the calculator page loads correctly', async () => {
    await SearchResultsPage.searchAndGoToCalculator(pages);
    await CalculatorPage.switchToCalculatorFrame(pages);
    await expect(pages('calculator').computeEngine.title).toHaveText('Google Cloud Pricing Calculator');
  });

  it('Validate basic calculator functionality', async () => {
    await SearchResultsPage.searchAndGoToCalculator(pages);
    await CalculatorPage.switchToCalculatorFrame(pages);
    await CalculatorPage.fillCalculatorForm(pages);
    const totalCost = await CalculatorPage.calculateTotalCost(pages);
    await expect(pages('calculator').estimate.totalEstimated).toHaveText(`Total Estimated Cost: USD ${totalCost} per 1 month`);
  });
});

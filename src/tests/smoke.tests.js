const {pages} = require('./../po');

describe('Google Cloud Platform Pricing Calculator - Smoke Tests', () => {
  beforeEach(async () => {
    await pages('googleCloud').open('');
    await browser.maximizeWindow();
  });

  it('Validate tha Google Cloud page title', async () => {
    await expect(browser).toHaveUrl('https://cloud.google.com/');
  });

  it('Validate that the calculator page loads correctly', async () => {
    await pages('googleCloud').searchAndGoToCalculator('Google Cloud Platform Pricing Calculator');
    await pages('search').validateResults();
    await pages('calculator').switchToCalculatorFrame();
    await expect(pages('calculator').title).toHaveText('Google Cloud Pricing Calculator');
  });

  it('Validate basic calculator functionality', async () => {
    await pages('googleCloud').searchAndGoToCalculator('Google Cloud Platform Pricing Calculator');
    await pages('search').validateResults();
    await pages('calculator').switchToCalculatorFrame();
    await pages('calculator').fillCalculatorForm();
    const totalCost = await pages('calculator').calculateTotalCost();
    await expect(pages('calculator').totalEstimated).toHaveText(`Total Estimated Cost: USD ${totalCost} per 1 month`);
  });
});

const {pages, CalculatorPage, SearchResultsPage, YopmailPage} = require('./../po');


describe('Google Cloud Platform Pricing Calculator', () => {
  beforeEach(async () => {
    await pages('googleCloud').open();
    await browser.maximizeWindow();
  });

  it('Validate Total Estimated Monthly Cost in Email', async () => {
    await SearchResultsPage.searchAndGoToCalculator(pages);
    await CalculatorPage.switchToCalculatorFrame(pages);
    await CalculatorPage.fillCalculatorForm(pages);
    const totalCost = await CalculatorPage.calculateTotalCost(pages);
    await expect(pages('calculator').estimate.totalEstimated).toHaveText(`Total Estimated Cost: USD ${totalCost} per 1 month`);
    await CalculatorPage.sendEmailEstimate(pages);
    const randomEmail = await YopmailPage.createYopmail(pages);
    await CalculatorPage.switchToCalculatorFrame(pages);
    await YopmailPage.validateTotalCostInEmail(pages, totalCost, randomEmail);
  });
});

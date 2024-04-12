const { pages } = require('./../po');


describe('Google Cloud Platform Pricing Calculator', () => {
  beforeEach(async () => {
    await pages('googleCloud').open('');
    await browser.maximizeWindow();
  });

  it('Validate Total Estimated Monthly Cost in Email', async () => {
    await pages('googleCloud').searchAndGoToCalculator('Google Cloud Platform Pricing Calculator');
    await pages('search').validateResults();
    await pages('calculator').switchToCalculatorFrame();
    await pages('calculator').fillCalculatorForm();
    const totalCost = await pages('calculator').calculateTotalCost();
    await expect(pages('calculator').totalEstimated).toHaveText(`Total Estimated Cost: USD ${totalCost} per 1 month`);
    await pages('calculator').emailEstimateOption();
    const randomEmail = await pages('yopmail').createEmailYopmail();
    await pages('calculator').switchToCalculatorFrame();
    await pages('calculator').sendEmailEstimate(randomEmail);
    await pages('yopmail').validateTotalCostInEmail(totalCost, randomEmail);
  });
});

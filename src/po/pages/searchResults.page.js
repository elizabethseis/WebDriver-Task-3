const {Search} = require('./../components');

class SearchResultsPage {
  constructor(pages) {
    this.pages = pages;
    this.search = new Search();
  }

  static async searchAndGoToCalculator(pages) {
    await pages('base').header.searchBtn.isDisplayed();
    await pages('base').header.searchBtn.click();
    await pages('base').header.searchInput.isDisplayed();
    await pages('base').header.searchInput.setValue('Google Cloud Platform Pricing Calculator');
    await browser.keys('\uE007');
    await pages('search').search.result.isDisplayed();
    await pages('search').search.result.click();
  }
}
module.exports = SearchResultsPage;

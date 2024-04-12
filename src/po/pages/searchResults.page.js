class SearchResultsPage {
  get result() {
    return $('[href*="calculator-legacy"]');
  }

  async validateResults() {
    await this.result.waitForDisplayed();
    await this.result.click();
  }
}
module.exports = SearchResultsPage;


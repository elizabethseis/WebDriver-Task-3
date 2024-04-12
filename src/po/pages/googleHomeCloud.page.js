const Page = require('./page');

class GoogleHomeCloudPage extends Page {
  get searchBtn() {
    return $('[class="YSM5S"]');
  }

  get searchInput() {
    return $('[type="text"]');
  }

  open() {
    return super.open('');
  }

  async searchAndGoToCalculator(textToSearch) {
    await this.searchBtn.waitForDisplayed();
    await this.searchBtn.click();
    await this.searchInput.setValue(textToSearch);
    await browser.keys('\uE007');
  }
}

module.exports = GoogleHomeCloudPage;

const GoogleCloudPage = require('./googleCloud.page');
const SearchResultsPage = require('./searchResults.page');
const CalculatorPage = require('./calculator.page');
const BasePage = require('./base.page');
const YopmailPage = require('./yopmail.page');

function pages(name) {
  const items = {
    base: new BasePage(),
    googleCloud: new GoogleCloudPage(),
    search: new SearchResultsPage(),
    calculator: new CalculatorPage(),
    yopmail: new YopmailPage(),
  };
  return items[name];
}
module.exports = {
  GoogleCloudPage,
  SearchResultsPage,
  CalculatorPage,
  BasePage,
  YopmailPage,
  pages,
};

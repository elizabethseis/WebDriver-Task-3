const GoogleHomeCloudPage = require('./googleHomeCloud.page');
const SearchResultsPage = require('./searchResults.page');
const CalculatorPage = require('./calculator.page');
const Page = require('./page');
const YopmailPage = require('./yopmail.page');

function pages(name) {
  const items = {
    page: new Page(),
    googleCloud: new GoogleHomeCloudPage(),
    search: new SearchResultsPage(),
    calculator: new CalculatorPage(),
    yopmail: new YopmailPage(),
  };
  return items[name];
}
module.exports = {
  GoogleHomeCloudPage,
  SearchResultsPage,
  CalculatorPage,
  Page,
  YopmailPage,
  pages,
};

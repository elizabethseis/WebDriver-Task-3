const {YopmailIframe, YopmailHome} = require('./../components');

class YopmailPage {
  constructor() {
    this.home = new YopmailHome();
    this.yopmailIframe = new YopmailIframe();
  }
}
module.exports = YopmailPage;

class yopmailIframeComponent {
  get iframe() {
    return $('div[id="wmmailmain"] iframe');
  }

  get iframeId() {
    return ('iframe[id="ifmail"]');
  }
}
module.exports = yopmailIframeComponent;

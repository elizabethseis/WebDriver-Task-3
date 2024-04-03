class YopmailHomeComponent {
  get email() {
    return $('input[id="login"]');
  }

  get refresh() {
    return $('button[id="refresh"]');
  }

  get countEmail() {
    return $('div[id="nbmail"]');
  }
}
module.exports = YopmailHomeComponent;

class emailEstimateComponent {
  get emailInput() {
    return $('form[name="emailForm"] md-input-container input[type="email"]');
  }

  get sendEmail() {
    return $('md-dialog-actions button:nth-child(2)');
  }
}
module.exports = emailEstimateComponent;

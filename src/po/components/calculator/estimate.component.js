class EstimateComponent {
  get totalEstimated() {
    return $('h2[class="md-title"] b[class="ng-binding"]');
  }

  get estimatedInstance() {
    return $('md-list-item div[class="ng-binding"]');
  }

  get estimatedGPU() {
    return $('md-list-item:nth-of-type(7) div[class="ng-binding"]');
  }

  get emailEstimate() {
    return $('button[id="Email Estimate"]');
  }
}
module.exports = EstimateComponent;

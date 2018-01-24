'use strict';

let Config = require('./lib/config');
let mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-service-worker-deferred-requests',

  included(app) {
    this._super.included && this._super.included.apply(this, arguments);
    this.app = app;
    this.app.options = this.app.options || {};
    this.app.options['esw-deferred-requests'] =
      this.app.options['esw-deferred-requests'] || {};
  },

  treeForServiceWorker(swTree, appTree) {
    let options = this.app.options['esw-deferred-requests'];
    let configFile = new Config([appTree], options);
    return mergeTrees([swTree, configFile]);
  }
};

define([
  'communicator',
  'backbone',
  'backbone.marionette',
  'controllers/users',
  'controllers/user',
  'controllers/repositories',
  'controllers/navigation',
  'comparators'
],
function( communicator, Backbone ) {
  'use strict';

  var initializers = {
    regions: function (options) {
      var app = options.app;

      communicator.reqres.setHandler("region:getRegion", function (region) {
        return app.rootView[region];
      });
    }
  };

  return initializers;
});

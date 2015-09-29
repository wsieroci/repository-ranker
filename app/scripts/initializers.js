define([
  'communicator',
  'backbone',
  'backbone.marionette',
  'controllers/users',
  'controllers/user',
  'controllers/repositories',
  'controllers/repository',
  'controllers/navigation',
  'controllers/error',
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

  window.onerror = function (message, url, line, column, error) {
    if(error && error.message === 'API error') {
      communicator.command.execute('route:error');
    }
  };

  return initializers;
});

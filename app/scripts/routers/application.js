define([
  'controllers/application',
  'backbone',
  'backbone.marionette'
],
function( applicationController, Backbone ) {
  'use strict';

  var Router = Marionette.AppRouter.extend({
    controller: applicationController,
    appRoutes: {
      '': 'users'
    }
  });

  return new Router();
});
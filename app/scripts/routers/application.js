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
      '': 'users',
      'user/:id': 'user',
      'repositories': 'repositories',
      'repository/:id': 'repository'
    }
  });

  return new Router();
});
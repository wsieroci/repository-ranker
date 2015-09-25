define([
  'backbone',
  'initializers',
  'controllers/application',
  'views/bodyLayoutView',
  'routers/application'
],
function( Backbone, initializers, applicationController, bodyLayoutView, router ) {
  'use strict';

  var app = new Backbone.Marionette.Application();

  app.rootView = bodyLayoutView;

  app.addInitializer(initializers.regions);

  app.on("start", function () {
    applicationController.init();
    if (Backbone.history) {
      Backbone.history.start({
        pushState: false
      });
    }
  });

  return app;
});

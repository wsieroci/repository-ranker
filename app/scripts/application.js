define([
  'backbone',
  'initializers',
  'views/bodyLayoutView',
  'routers/application'
],
function( Backbone, initializers, bodyLayoutView, router ) {
  'use strict';

  var app = new Backbone.Marionette.Application();

  app.rootView = bodyLayoutView;

  app.addInitializer(initializers.regions);

  app.on("start", function () {
    if (Backbone.history) {
      Backbone.history.start({
        pushState: false
      });
    }
  });

  return app;
});

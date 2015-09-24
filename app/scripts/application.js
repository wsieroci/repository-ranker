define([
  'backbone',
  'communicator',
  'initializers',
  'routers/application',
  'hbs!tmpl/welcome'
],
function( Backbone, Communicator, Initializers, Router, Welcome_tmpl ) {
  'use strict';

  var welcomeTmpl = Welcome_tmpl;

  var App = new Backbone.Marionette.Application();

  /* Add application regions here */
  App.addRegions({});

  /* Add initializers here */
  App.addInitializer( function () {
    document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
    Communicator.mediator.trigger("APP:START");
  });

  App.addInitializer(Initializers.router);

  App.on("start", function () {
    if (Backbone.history) {
      Backbone.history.start({
        pushState: false
      });
    }
  });

  return App;
});

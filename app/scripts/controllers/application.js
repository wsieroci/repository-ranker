define([
  'communicator',
  'backbone',
  'backbone.marionette'
],
function( communicator, Backbone ) {
  'use strict';

  var ApplicationController = Backbone.Marionette.Controller.extend({
    users: function () {
      communicator.command.execute('route:users');
    }
  });

  return new ApplicationController();
});
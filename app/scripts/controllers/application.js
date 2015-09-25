define([
  'communicator',
  'backbone',
  'backbone.marionette'
],
function( communicator, Backbone ) {
  'use strict';

  var ApplicationController = Backbone.Marionette.Controller.extend({
    users: function () {
      this.showNavigation();
      communicator.command.execute('route:users');
    },
    showNavigation: function () {
      communicator.reqres.request('controller:navigation');
    }
  });

  return new ApplicationController();
});
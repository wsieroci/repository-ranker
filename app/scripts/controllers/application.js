define([
  'communicator',
  'backbone',
  'backbone.marionette'
],
function( communicator, Backbone ) {
  'use strict';

  var ApplicationController = Backbone.Marionette.Controller.extend({
    init: function () {
      this._showNavigation();
    },
    users: function () {
      communicator.command.execute('route:users');
    },
    _showNavigation: function () {
      communicator.reqres.request('controller:navigation');
    }
  });

  return new ApplicationController();
});
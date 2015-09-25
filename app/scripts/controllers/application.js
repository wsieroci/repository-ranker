define([
  'communicator',
  'controllers/base'
],
function( communicator, BaseController, Backbone ) {
  'use strict';

  var ApplicationController = BaseController.extend({
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
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
    user: function (id) {
      communicator.command.execute('route:user', parseInt(id, 10));
    },
    _showNavigation: function () {
      communicator.reqres.request('controller:navigation');
    }
  });

  return new ApplicationController();
});
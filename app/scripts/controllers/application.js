define([
  'communicator',
  'underscore',
  'controllers/base'
],
function( communicator, _, BaseController, Backbone ) {
  'use strict';

  var ApplicationController = BaseController.extend({
    init: function () {
      this._showNavigation();
    },
    users: function () {
      this._showLoadingView();
      _.delay(function () {
        communicator.command.execute('route:users');
      }, 0);
    },
    user: function (id) {
      communicator.command.execute('route:user', id);
    },
    repositories: function () {
      this._showLoadingView();
      _.delay(function () {
        communicator.command.execute('route:repositories');
      }, 0);
    },
    repository: function (id) {
      this._showLoadingView();
      _.delay(function () {
        communicator.command.execute('route:repository', id);
      }, 0);
    },
    _showNavigation: function () {
      communicator.reqres.request('controller:navigation');
    }
  });

  return new ApplicationController();
});
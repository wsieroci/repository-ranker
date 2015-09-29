define([
  'communicator',
  'controllers/base',
  'views/error',
  'backbone'
],
function( communicator, BaseController, ErrorView, Backbone ) {
  'use strict';

  var ErrorController = BaseController.extend({
    initialize: function (options) {
      this._showError();
    },
    _showError: function (user) {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new ErrorView({region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:error', function () {
    return new ErrorController();
  });
});
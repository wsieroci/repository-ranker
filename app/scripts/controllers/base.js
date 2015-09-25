define([
  'communicator',
  'views/loading',
  'backbone',
  'backbone.marionette'
],
function( communicator, LoadingView, Backbone ) {
  'use strict';

  var BaseController = Backbone.Marionette.Controller.extend({
    _showLoadingView: function () {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new LoadingView({region: region});
      region.show(view);
    }
  });

  return BaseController;
});
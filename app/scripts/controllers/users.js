define([
  'communicator',
  'views/usersView',
  'backbone',
  'backbone.marionette'
],
function( communicator, UsersView, Backbone ) {
  'use strict';

  var UsersController = Backbone.Marionette.Controller.extend({
    initialize: function () {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new UsersView({region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:users', function () {
    return new UsersController();
  });
});
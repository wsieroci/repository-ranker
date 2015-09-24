define([
  'communicator',
  'views/usersView',
  'models/user',
  'collections/users',
  'backbone',
  'backbone.marionette'
],
function( communicator, UsersView, User, UserCollection, Backbone ) {
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
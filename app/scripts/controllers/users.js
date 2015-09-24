define([
  'communicator',
  'views/usersView',
  'models/user',
  'collections/orgRepositories',
  'collections/users',
  'backbone',
  'backbone.marionette'
],
function( communicator, UsersView, User, OrgRepositories, UserCollection, Backbone ) {
  'use strict';

  var users = communicator.reqres.request("collection:getUsers");

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
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

  function getUsers() {
    var users = communicator.reqres.request("collection:getUsers");
    return users.then(function (userCollection) {
      userCollection.comparator =  function(user) {
        return -user.get("total");
      };
      userCollection.sort();
      return userCollection;
    });
  }

  var UsersController = Backbone.Marionette.Controller.extend({
    initialize: function () {
      getUsers().then(function (users) {
        this._showUsers(users);
      }.bind(this));
    },
    _showUsers: function (users) {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new UsersView({collection: users, region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:users', function () {
    return new UsersController();
  });
});
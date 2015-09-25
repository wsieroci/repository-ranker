define([
  'communicator',
  'controllers/base',
  'views/users',
  'models/user',
  'collections/orgRepositories',
  'collections/users'
],
function( communicator, BaseController, UsersView, User, OrgRepositories, UserCollection ) {
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

  var UsersController = BaseController.extend({
    initialize: function () {
      this._showLoadingView();
      getUsers().then(function (users) {
        debugger
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
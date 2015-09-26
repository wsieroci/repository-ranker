define([
  'communicator',
  'controllers/base',
  'views/users',
  'models/user',
  'collections/organizationRepositories',
  'collections/users'
],
function( communicator, BaseController, UsersView, User, OrganizationRepositories, UserCollection ) {
  'use strict';

  function getUsers() {
    var users = communicator.reqres.request("collection:getUsers");
    return users.then(function (userCollection) {
      return userCollection;
    });
  }

  var currentUserList;

  var UsersController = BaseController.extend({
    initialize: function () {
      this._showLoadingView();
      getUsers().then(function (users) {
        currentUserList = users;
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

  communicator.command.setHandler('controller:users:sort', function (type) {
    debugger
    if(currentUserList) {
      currentUserList.comparator = communicator.reqres.request('comparator:get', type);
      currentUserList.sort();
    }
  });
});
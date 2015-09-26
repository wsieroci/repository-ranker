define([
  'communicator',
  'underscore',
  'controllers/base',
  'views/users',
  'models/user',
  'collections/organizationRepositories',
  'collections/users'
],
function( communicator, _, BaseController, UsersView, User, OrganizationRepositories, UserCollection ) {
  'use strict';

  function getUsers() {
    var users = communicator.reqres.request("collection:getUsers");
    return users;
  }

  var currentUserList;
  var usersController;

  var UsersController = BaseController.extend({
    initialize: function () {
      this._showLoadingView();
      getUsers().then(function (users) {
        currentUserList = users;
        this.showUsers(users);
      }.bind(this));
    },
    showUsers: function (users) {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new UsersView({collection: users, region: region});
      region.show(view);
    },
    showLoading: function () {
      this._showLoadingView();
    }
  });

  communicator.command.setHandler('route:users', function () {
    communicator.command.execute('controller:navigation:showSorting');
    usersController = new UsersController();
  });

  communicator.command.setHandler('controller:users:sort', function (type) {
    if(usersController) {
      usersController.showLoading();
    }
    if(currentUserList && usersController) {
      _.delay(function () {
        currentUserList.comparator = communicator.reqres.request('comparator:get', type);
        currentUserList.sort();
        usersController.showUsers(currentUserList);
      }, 0);
    }
  });
});
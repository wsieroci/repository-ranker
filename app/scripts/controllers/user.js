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

  function getUser() {
    var user = communicator.reqres.request("collection:getUser");
    return user.then(function (user) {
      return user;
    });
  }

  var UserController = BaseController.extend({
    initialize: function (options) {
      var id = options.id;
      this._showLoadingView();
      getUser(id).then(function (user) {
        this._showUser(user);
      }.bind(this));
    },
    _showUser: function (user) {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new UserView({model: user, region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:user', function (id) {
    return new UserController({id: id});
  });
});
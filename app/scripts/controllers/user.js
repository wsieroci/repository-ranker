define([
  'communicator',
  'controllers/base',
  'views/user',
  'models/user',
  'collections/organizationRepositories',
  'collections/users',
  'backbone'
],
function( communicator, BaseController, UserView, User, OrganizationRepositories, UserCollection, Backbone ) {
  'use strict';

  function getUser(id) {
    var user = communicator.reqres.request("model:getUser", id);
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
      debugger
      var view = new UserView({model: user, collection: user.get('repositories'), region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:user', function (id) {
    communicator.command.execute('controller:navigation:hideSorting');
    return new UserController({id: id});
  });
});
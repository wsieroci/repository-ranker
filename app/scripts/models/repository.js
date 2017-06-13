define([
  'backbone',
  'communicator',
  'underscore',
  'models/user',
  'collections/users',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, communicator, _, UserModel, UserCollection, Associations ) {
  'use strict';

  var CONTRIBUTORS_API = 'https://api.github.com/repos/<%= name %>/stats/contributors?<%= credentials %>';

  function addRepository(userCollection, repository) {
    userCollection.each(function (model) {
      model.addRepository(repository);
    });
  }

  var RepositoryModel = Associations.AssociatedModel.extend({
    relations: [
      {
        type: Backbone.Many,
        key: 'users',
        relatedModel: UserModel
      }
    ],
    defaults: {
      users: []
    },
    initialize: function () {
      this._isUsersFetched = false;
    },
    fetchUsers: function () {
      if(this._isUsersFetched === false) {
        var userCollection = new UserCollection();
        var name = this.get('full_name');
        userCollection.url = _.template(CONTRIBUTORS_API)({
          name: name, 
          credentials: communicator.reqres.request('options:getCredentials')
        });
        return userCollection.fetch().then(function () {
          this.set('users', userCollection);
          addRepository(userCollection, this);
          return this;
        }.bind(this));
      } else {
        var deferred = $.Deferred();
        deferred.resolve(this);
        return deferred.promise();
      }
    }
  });

  communicator.reqres.setHandler('model:getRepository', function (id) {
    var users = communicator.reqres.request('collection:getUsers');
    return users.then(function () {
      var repositories = communicator.reqres.request('collection:getOrganizationRepositories');
      return repositories.then(function (repositories) {
        return repositories.get(id);
      })
    });
  });

  return RepositoryModel;
});
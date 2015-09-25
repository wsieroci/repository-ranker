define([
  'backbone',
  'models/user',
  'collections/users',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, UserModel, UserCollection, Associations ) {
  'use strict';

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
        userCollection.url = 'https://api.github.com/repos/' + name + '/stats/contributors?client_id=7afd6b8573c9b0fadc21&client_secret=74e744a109e702226c7232aa6d1493c9fead4018';
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

  return RepositoryModel;
});